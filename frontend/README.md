# Project Details

## Project Name

Frontend

## Team Members and Contributions

Blake Horne - behorne

Michael Sun - msun59

# Design Choices

The main functionality of the program is shared between three classes: REPL, REPLHistory, and REPLInput.

REPL is the top level class of the project and contains REPLHistory and REPLInput.

REPLHistory is responsible for displaying the responses sent by the application. The command and output history is stored as an array of 2D arrays of strings: the code takes each 2D array and turns it to an HTMLTable to be displayed. We learned to do this with help from an outside source at https://www.geeksforgeeks.org/how-to-build-an-html-table-using-reactjs-from-arrays/, which does the same function in JavaScript.

REPLInput is responsible for handling submissions to the application. It reads a command and calls for a function that fetches a response from the backend. The functions are stored in a map that maps the string command to the function call to allow for easy command registration and deregistration without changing much of the REPL code.

We included a map through the mapbox api for this sprint. The user first my use the `setup-redlining` command to load in the redlining data overlay. Afterwards the user may click on certain parts of the map to display its City, State, and Name. If an income data csv file is loaded, the frontend will also conduct a search on the location of the marker that was selected.

## Data Structures

History: String[][][]
functions: Map<string, REPLFunction>

# Errors/Bugs

We have no known errors or bugs at this time.

# Tests

For our tests, we first tested basic expected responses of our program. Then we began to look at ways to give the program issues such as sending ill-formed commands, repeatedly loading files, repeatedly calling mode, etc.

The testing is done both with mocked data and with integration between the frontend and backend.

# How To…

## Run the Program

The server is started with the terminal command npm start. Then, navigating to the URL http://localhost:8000/ loads the web interface. Commands can be issued into the text box provided by typing them, then clicking the submit button.

Supported commands are:

### load_file

Syntax: load_file filepath

This command loads a CSV file with a specified filepath into memory. It makes a call to the mocked data, using the specified filepath as a key, to obtain the CSV body and, optionally, the data headers. The has_headers optional argument defaults to false, meaning a CSV is loaded, but its first row is not set as the headers. If has_headers is true, a CSV is loaded with its first row as the headers.

### view

Syntax: view

This command displays the currently loaded CSV in a table. If no CSV is loaded, an error message is printed.

### search

Syntax: search value {column} {hasHeaders}

This command searches a loaded CSV file for a specific value, returning any row where a column is equal to the provided value.
There is an optional argument to specify the column and to let the server know if the function has headers or not.

The column argument can either be a column index, for all CSVs, or a column name, if the CSV was loaded with the has_headers boolean as true.

### broadband

Syntax: broadband state county

This command returns the percentage of houses in a certain county at the time that the command is submitted.

### term_search

Syntax: term_search {keyword}

This command displays on the map as an overlay what regions stored in the loaded geoJSON have a property that includes the keyword

### bbox_search

Syntax: term_search [{min Lat},{max Lat}] [{min Long},{max Long}]

This command displays on the map as an overlay what regions stored in the loaded geoJSON are contained within the bounding box provided in the input

### set_mock_mode

Syntax: set_mock_mode {boolean}

This command sets the mock mode depending on the input. True turns on mocking mode, false turns off.

### clear_history

Syntax: clear_history

This command clears the history for a cleaner view experience without having to refresh

## Run the Tests You Wrote/Were Provided

To run tests: `npx playwright test`

To run tests in UI mode: `npx playwright test --ui`
