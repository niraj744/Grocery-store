function searchHandler(query) {
    // Make an API call with search query
    getSearchResults(query);
}
// A debounce function that takes a function and a delay as parameters
function debounce(func, delay) {
    // A timer variable to track the delay period
    let timer;
    // Return a function that takes arguments
    return function(…args) {
        // Clear the previous timer if any
        clearTimeout(timer);
        // Set a new timer that will execute the function after the delay period
        timer = setTimeout(() => {
            // Apply the function with arguments
            func.apply(this, args);
        }, delay);
    };
}
// A debounced version of the search handler with 500ms delay
const debouncedSearchHandler = debounce(searchHandler, 500);
// Add an event listener to the search bar input
searchBar.addEventListener("input", (event) => {
    // Get the value of the input
    const query = event.target.value;
    // Call the debounced search handler with the query
    debouncedSearchHandler(query);
});