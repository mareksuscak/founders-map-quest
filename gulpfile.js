'use strict';

var autoprefixer = require('autoprefixer-stylus');
var browserify   = require('browserify');
var browserSync  = require('browser-sync');
var del          = require('del');
var gulp         = require('gulp');
var plugins      = require('gulp-load-plugins')();
var stylish      = require('jshint-stylish');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');
var watchify     = require('watchify');
var argv         = require('yargs').argv;

// gulp build --production
var production = !!argv.production;

// gulp watch and gulp
var watch = argv._ === 'watch' || argv._ === '';

// Handle errors by displaying a notification and logging to standard output
var handleError = function(task) {
  return function(err) {
    plugins.notify.onError({
      message: task + ' failed, check the logs.',
      sound: false
    })(err);

    plugins.util.log(plugins.util.colors.bgRed(task + ' error:'),
      plugins.util.colors.red(err));
  };
};

// Clean dist directory
gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
});

// Compile static assets
gulp.task('compile:assets', function() {
  return gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist/'));
});

// Optimize images
gulp.task('optimize:images', function() {
  return gulp.src('src/images/**/*.{gif,jpg,png,svg}')
      .pipe(plugins.imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        // png optimization
        optimizationLevel: production ? 3 : 1
      }))
      .pipe(gulp.dest('dist/images/'));
});

// Compile styl & auto-inject into browsers
gulp.task('compile:styles', function () {
  gulp.src('src/styles/main.styl')
    .pipe(plugins.stylus({
      compress: production,
      use: [
          autoprefixer({ browsers: ['last 2 versions', 'ie 9'] })
      ],
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'dist/styles/'
      }
    }))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}));
});

// Run linter for script files
gulp.task('lint:scripts', function() {
  return gulp.src([
        'gulpfile.js',
        'src/scripts/**/*.js',
      ])
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter(stylish))
      .pipe(plugins.jshint.reporter('fail'))
      .on('error', handleError('lint:scripts'));
});

// Compile js scripts
gulp.task('compile:scripts', function () {
  var bundler = browserify({
        entries: ['./src/scripts/app.js'],
        debug: !production,
        insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true
  });

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', handleError('Scripts'))
      .pipe(source('app.js'))
      .pipe(plugins.if(production, buffer()))
      .pipe(plugins.if(production, plugins.uglify()))
      .pipe(plugins.if(browserSync.active, gulp.dest('dist/scripts/')));
  }

  if(watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  return rebundle();
});

// Start the web server through BrowserSync
gulp.task('bs:server', function() {
  browserSync({
    server: {
      baseDir: './dist/'
    },
    port: 8000
  });
});

// Reload all browsers but wait for compile:scripts first
gulp.task('bs:reload:scripts', ['compile:scripts'], function(){
  if(browserSync.active) {
    browserSync.reload();
  }
});

// Reload all browsers but wait for compile:assets first
gulp.task('bs:reload:assets', ['compile:assets'], function(){
  if(browserSync.active) {
    browserSync.reload();
  }
});

// Reload all browsers but wait for optimize:images first
gulp.task('bs:reload:images', ['optimize:images'], function(){
  if(browserSync.active) {
    browserSync.reload();
  }
});

// Watch js, styl AND html files, doing different things with each.
gulp.task('watch', [
  'optimize:images',
  'compile:assets',
  'compile:styles',
  'compile:scripts',
  'bs:server'],
  function() {
    gulp.watch('src/styles/**/*.styl', ['compile:styles']);
    gulp.watch(['gulpfile.js', 'src/scripts/**/*.js'], ['lint:scripts', 'bs:reload:scripts']);
    gulp.watch('src/**/*.html', ['bs:reload:assets']);
    gulp.watch('src/images/**/*.{gif,jpg,png,svg}', ['bs:reload:images']);
});

// Build the application
gulp.task('build', [
  'optimize:images',
  'compile:assets',
  'compile:styles',
  'compile:scripts'
]);

gulp.task('default', ['watch']);

// gulp (watch) : for development and browser sync
// gulp build : for a one off development build
// gulp build --production : for a minified production build
