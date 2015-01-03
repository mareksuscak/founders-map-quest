'use strict';

var autoprefixer = require('autoprefixer-stylus'),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    del = require('del'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    reactify = require('reactify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    argv = require('yargs').argv;

// gulp build --production or NODE_ENV=production gulp build
var production = process.env.NODE_ENV === 'production' || !!argv.production;

if(production) {
  plugins.util.log(plugins.util.colors.green('Environment: PRODUCTION'));
} else {
  plugins.util.log(plugins.util.colors.green('Environment: DEVELOPMENT'));
}

// Handle errors by displaying a notification and logging to standard output
var handleError = function(msg) {
  return function(err) {
    plugins.notify.onError({
      message: msg
    })(err);

    plugins.util.log(plugins.util.colors.bgRed('Error Details: '),
      plugins.util.colors.red(err));
  };
};

// Clean dist directory
gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
});

// Bower Components
gulp.task('bower', function() {
  return plugins.bower()
    .pipe(gulp.dest('dist/vendor'));
});

// Compile static assets
gulp.task('compile:assets', function() {
  return gulp.src('src/*.{html,txt,ico}')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(plugins.notify('Assets compiled successfully.'));
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
    .pipe(gulp.dest('dist/images/'))
    .pipe(browserSync.reload({stream: true}));
});

// Compile styl & auto-inject into browsers
gulp.task('compile:styles', function () {
  return gulp.src('src/styles/main.styl')
    // If there's a syntax error styles watcher stops
    // so use plumber to prevent that behavior.
    .pipe(plugins.plumber())
    .pipe(plugins.stylus({
      compress: production,
      use: [
          autoprefixer({ browsers: ['last 2 versions'] })
      ],
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'dist/styles/'
      }
    }))
    .on('error', handleError('Styles compilation failed.'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(plugins.notify('Styles compiled successfully.'));
});

// Run linter for script files
gulp.task('lint:scripts', function() {
  return gulp.src([
      'gulpfile.js',
      'src/scripts/**/*.js',
      'src/scripts/**/*.jsx'
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))
    .pipe(plugins.jshint.reporter('fail'))
    .on('error', plugins.notify.onError(function () {
        return 'Script linting failed.';
    }));
});

// Setup browserify and watchify if requested
var scripts = function(watch) {
  var bundler = browserify('./src/scripts/app.js', {
    basedir: __dirname,
    debug: !production,
    cache: {},
    packageCache: {},
    fullPaths: watch
  });

  if(watch) {
    plugins.util.log('Using Watchify for Browserify builds.');
    bundler = watchify(bundler);
  }

  // These are now defined in package.json
  // bundler.transform(reactify);
  // bundler.transform(browserifyShim);

  function rebundle() {
    return bundler.bundle()
      .on('error', handleError('Scripts compilation failed.'))
      .pipe(source('app.js'))
      .pipe(plugins.if(production, buffer()))
      .pipe(plugins.if(production, plugins.uglify()))
      .pipe(gulp.dest('dist/scripts/'))
      .pipe(browserSync.reload({stream: true}))
      .pipe(plugins.notify('Scripts compiled successfully.'));
  }

  bundler.on('update', rebundle);
  return rebundle();
};

// Compile js scripts
gulp.task('compile:scripts', ['bower'], function () {
  return scripts(false);
});

// Watch js scripts
gulp.task('watch:scripts', ['bower'], function() {
  return scripts(true);
});

// Watch js, styl AND static files, doing different things with each.
gulp.task('watch', [
  'optimize:images',
  'compile:assets',
  'compile:styles',
  'watch:scripts'],
  function() {
    gulp.watch('src/styles/**/*.styl', ['compile:styles']);
    gulp.watch('src/*.{html,txt,ico}', ['compile:assets']);
    gulp.watch('src/images/**/*.{gif,jpg,png,svg}', ['optimize:images']);
});

// Start the web server through BrowserSync
gulp.task('serve', ['watch'], function() {
  browserSync({
    server: {
      baseDir: './dist/'
    },
    port: 8000
  });
});

// Build the application
gulp.task('build', [
  'optimize:images',
  'compile:assets',
  'compile:styles',
  'compile:scripts'
]);

gulp.task('default', ['serve']);

// gulp (serve) : for development and browser sync
// gulp build : for a one off development build
// gulp build --production : for a minified production build
// NODE_ENV=production gulp build : alternative syntax for production build
