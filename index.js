let form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    getQuestionInfo()
})

const url = "https://opentdb.com/api.php?amount=10"


function createQuestion(qObject) {
    let main = document.querySelector("main")
    let article = questionTemplate(qObject)
    main.append(article)
}

function questionTemplate(qObject) {

    let categoryText = qObject.category
    let correctAnswerText = qObject.correct_answer
    let questionText = qObject.question

    let article = document.createElement("article")
    let category = document.createElement("h2")
    let question = document.createElement("p")
    let showAnswer = document.createElement("button")
    let correctAnswer = document.createElement('p')

    category.innerText = categoryText
    question.innerText = questionText
    showAnswer.innerText = "Show Answer"
    correctAnswer.innerText = correctAnswerText

    article.classList.add("card")
    correctAnswer.classList.add("hidden")

    showAnswer.addEventListener("click", (e) => {
        correctAnswer.classList.toggle("hidden")
        if(showAnswer.innerText == "Show Answer") {
            showAnswer.innerText = "Hide Answer"
        } else {
            showAnswer.innerText = "Show Answer"
        }
    })


    article.append(category)
    article.append(question)
    article.append(showAnswer)
    article.append(correctAnswer)

    

    return article
}

function getQuestionInfo() {
  let result = fetch(url)
    .then(data => data.json())
    .then(json => {
        // console.log(json.results)
        for(question of json.results) {
            createQuestion(question)
        }
    })
}




