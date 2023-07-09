const url = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean";

const sumbitButton = document.querySelector('button[type="submit"]');
const centered = document.querySelector("main");

sumbitButton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("firing click");

    fetch(url)
    .then(data => data.json())
    .then(json => showQuestion(json))
    .catch(err => alert("Something went wrong.", err));

})

const showQuestion = (json) => {
    let results = json.results
    console.log(results)
    
    for (let key in results) {
        centered.innerHTML = `
        <article class="card">
            <h2>${key.category}</h2>
            <p>${key.question}</p>
            <button>Show Answer</button>
            <p class="hidden">${key.correct_answer}</p>
        </article>`
    }
}