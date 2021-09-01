const searchText = document.getElementById("input-field");
const displayResult = document.getElementById("display-result");

const validationWarning = (action) => {
  const validation = document.getElementById("validation-warning");
  if (action === "show") {
    validation.classList.remove("d-none");
  } else {
    validation.classList.add("d-none");
  }
};

const numberOfSearchResult = (quantity) => {
  const searchResult = document.getElementById("search-result");
  const searchQuantity = document.getElementById("number-of-search-result");

  searchResult.classList.remove("d-none");
  searchQuantity.innerText = quantity;
};

const searchBook = () => {
  displayResult.innerHTML = "";
  fetch(`http://openlibrary.org/search.json?q=${searchText.value}`)
    .then((res) => res.json())
    .then((data) => {
      // validation
      if (data.numFound === 0) {
        validationWarning("show");
        numberOfSearchResult(data.numFound);
      } else {
        validationWarning();
        numberOfSearchResult(data.numFound);
        displaySearchResult(data.docs);
      }
    });
};

const displaySearchResult = (results) => {
  //   console.log(results);
  results.forEach((result) => {
    console.log(result?.first_publish_year);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("col-3");
    bookDiv.innerHTML = `
        <div class="card mt-3" style="width: 18rem;">
            <img class='img-fluid card-img-top' src="https://covers.openlibrary.org/b/id/${result?.cover_i}-M.jpg">
            <div class="card-body">
                <h5 class="card-title">${result?.title}</h5>
                <h5>Authors: ${result?.author_name}</h5>
                <strong>Publication Date: ${result?.first_publish_year}</strong>
                <p>Publisher: ${result?.publisher}</p>
            </div>
        </div>
    `;
    displayResult.appendChild(bookDiv);
  });
};

{
  /* <h5>Authors: ${result?.author_name?.forEach(
                  (author) => author
                )}</h5> */
}
