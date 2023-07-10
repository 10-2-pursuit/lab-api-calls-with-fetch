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
    let questionsHTML = '';
    
    for (let i = 0; i < results.length; i++) {
        questionsHTML += `
        <article class="card">
            <h2>${results[i].category}</h2>
            <p>${results[i].question}</p>
            <button class="show-answer-btn">Show Answer</button>
            <p class="hidden">${results[i].correct_answer}</p>
        </article>`;
    }
    centered.innerHTML = questionsHTML;
    
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("show-answer-btn")) {
            const answerElement = e.target.nextElementSibling;
            answerElement.classList.toggle("hidden");
    
            if (answerElement.classList.contains("hidden")) {
                e.target.textContent = "Show Answer";
            } else {
                e.target.textContent = "Hide Answer";
            }
        }
    });
}
