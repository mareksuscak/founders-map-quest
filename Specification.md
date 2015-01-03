Feature: Publishing new founders.
  User must be able to publish new founders by providing a list in CSV format.
  User must be able to choose a CSV separator from the list:
    - Comma,
    - Semicolon,
    - Tab.
  User must be able to map CSV columns to following default founder record 
  columns:
    - Company Name,
    - Founder,
    - City,
    - Country,
    - Postal Code, 
    - Street,
    - Photo,
    - Home Page,
    - Label on a Map
    - Latitude,
    - Longitude.

Feature: Displaying founders on an interactive map.
  All founders located within the visible region of the map except those marked 
  as hidden should be displayed on a map as clustered POIs. 


Feature: Displaying founders in a list.
  All founders matching the filter criteria except those marked as hidden 
  should be displayed in a paginated list.


Feature: Filtering founders in a list.
  User must be able to define following filter criteria:
    - Sort by property,
    - Sort order,
    - Filter by property, 
    - Filter search term,
    - Current page.


Feature: Clicking a founder label in a list.
  When user clicks a founder label in the list map should be automatically 
  focused to the founder location.


Feature: Clicking a homepage link in a list.
  When user clicks a homepage link he should be navigated to homepage URL 
  in a new browser tab or window.


Feature: Clicking a photo in a list.
  When user clicks a photo thumbnail it should automatically be enlarged with
  a nice transition.

Feature: Hiding specific rows on a map.
  User must be able to hide specific rows on a map by unchecking a checkbox.
  The list of hidden rows is per user session.
