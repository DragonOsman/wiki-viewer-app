let searchButton = document.querySelector("#search-button");

let searchField = document.querySelector("#search");

const form = document.querySelector("#wiki-search");
  form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  // prevent page from reloading when form is submitted
  event.preventDefault();
  
  // get the value of the input field
  const input = document.querySelector("#search").value;
  
  // remove whitespace from the input
  const query = input.trim();
  
  // call `fetchResults` and pass it the `query` variable
  fetchResults(query);
}

function fetchResults(query) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`;
  
  fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const results = data.query.search;
    displayResults(results);
  })
  .catch(() => console.log("An error occurred."));
}

function displayResults(results) {
  // Store a reference to `.results`
  const searchResults = document.querySelector(".results");
  
  // Remove all child elements
  searchResults.innerHTML = '';

  // Loop over results array
  results.forEach(result => {
   const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
    searchResults.insertAdjacentHTML("beforeend",
      `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
    );
  });
}
