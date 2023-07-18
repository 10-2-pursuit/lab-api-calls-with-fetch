// .js:

// variable for API
const NEWSAPI_URL =
  "https://newsapi.org/v2/top-headlines/sources?apiKey=1681be04f001473c982be84269c6cec3";

// locate main
const main = document.querySelector("main");

// Function to load API automatically and populate the page
const loadNewsAutomatically = () => {
  fetch(NEWSAPI_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Check the response data in the console
      showNews(data);
    })
    .catch((err) => {
      console.error(err); // Log the error in the console
      showError(err);
    });
};

// Call the function to load news automatically
loadNewsAutomatically();

const showNews = (data) => {
  main.innerHTML = "";

  if (data && data.sources) {
    data.sources.forEach((source) => {
      const panel = document.createElement("div");
      panel.classList.add("panel");

      const category = document.createElement("p");
      category.textContent = source.category.toUpperCase();
      panel.appendChild(category);

      const country = document.createElement("h2");
      country.textContent = source.country.toUpperCase();
      panel.appendChild(country);

      const name = document.createElement("h4");
      name.textContent = source.name;
      panel.appendChild(name);

      const description = document.createElement("p");
      description.textContent = source.description;
      panel.appendChild(description);

      const readMore = document.createElement("a");
      readMore.textContent = "Read more";
      readMore.href = source.url;
      readMore.addEventListener("click", openInSameTab);
      panel.appendChild(readMore);

      main.appendChild(panel);
    });
  } else {
    showError("Invalid API response"); // Handle invalid response
  }
};

const openInSameTab = (e) => {
  e.preventDefault();
  window.location.href = e.target.href;
};

const showError = (err) => {
  main.innerHTML = `
    <section class="error">
    <p>An error has occurred!</p>
    <p class="message">${err}</p>
