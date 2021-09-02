/* ------------
        getting element using corresponding id  
--------------*/
const searchText = document.getElementById("input-field");
const displayResult = document.getElementById("display-result");
const searchResult = document.getElementById("search-result");
const searchQuantity = document.getElementById("number-of-search-result");
const spinnerElement = document.getElementById("spinner");

/* ------------
        spinner function to show or hide spinner  
--------------*/
const spinner = (action) => {
  if (action === "show") {
    spinnerElement.classList.remove("d-none");
  } else {
    spinnerElement.classList.add("d-none");
  }
};

/* ------------
        validation warning for irrelevant search
--------------*/
const validationWarning = (action) => {
  const validation = document.getElementById("validation-warning");
  if (action === "show") {
    validation.classList.remove("d-none");
  } else {
    validation.classList.add("d-none");
  }
};

/* ------------
        display number of search result 
--------------*/
const numberOfSearchResult = (quantity) => {
  searchResult.classList.remove("d-none");
  searchQuantity.innerText = quantity;
  document.getElementById("input-text").innerText = `"${searchText.value}" `;
  // clearing search field
  searchText.value = "";
};

/* ------------
        searchBook function added to search button
--------------*/
const searchBook = () => {
  searchResult.classList.add("d-none");
  spinner("show");
  validationWarning();
  displayResult.innerHTML = "";
  fetch(`https://openlibrary.org/search.json?q=${searchText.value}`)
    .then((res) => res.json())
    .then((data) => dataProcess(data));
};

/* ------------
        processing returned data from the server
--------------*/
const dataProcess = (data) => {
  // hide spinner
  spinner();

  // validation
  if (data.numFound === 0) {
    validationWarning("show");
    numberOfSearchResult(data.numFound);
  } else {
    validationWarning();
    numberOfSearchResult(data.numFound);
    processSearchResult(data.docs.slice(0, 32));
  }
};

/* ------------
        processing search result  
--------------*/
const processSearchResult = (results) => {
  // console.log(results[0]?.cover_i);
  results.forEach((result) => {
    // console.log(result);
    if (result.cover_i === undefined) {
      url = "image/No_image_available.png";
    } else {
      url = `https://covers.openlibrary.org/b/id/${result?.cover_i}-M.jpg`;
    }
    showSearchResult(result);
  });
};

/* ------------
        display search result
--------------*/
const showSearchResult = (result) => {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("col-md-3");
  bookDiv.innerHTML = `
    <div class="card mt-4">
      <img class='img-fluid img-thumbnail card-img-top' src="${url}">
      <div class="card-body">
        <h5 class="card-title">${
          result.title ? result.title : "not found!"
        }</h5>
        <h5 class='authors'>${
          result.author_name ? result.author_name : "not found!"
        }</h5>
        <h6>First Publish: <strong class='publish-date fw-bold'>${
          result.first_publish_year ? result.first_publish_year : "not found!"
        }</strong></h6>
        <h6>Publisher: <span class="publisher">${
          result.publisher ? result.publisher : "not found!"
        }</span></h6>
      </div>
    </div>
  `;
  displayResult.appendChild(bookDiv);
};
