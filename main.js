// console.log("this script is connected");


// const button = document.querySelector("button");
// const trivia = document.querySelector(".centered");

// button.addEventListener("click", (e) => {
//     e.preventDefault();
//     // const id = input.value;
//     fetch(url)
//         .then(data => data.json())
//         .then(json => {
//             for(question of json.results) {
//                 createQuestion(question)
//             }
//         })
//     }

// const showTrivia = (json) => {
//     trivia.innerHTML = `
//         <article class= "card">
//             <h2>${json.category[0]}</h2>
//             <p>${json.question[0]}</p>
//             <button>Show Answer</button>
//             <p class="hidden">${json.correct_answer}</p>
//         </article>
//     `
// };

// const showError = (err) => {
//     trivia.innerHTML =  `
//     <section class="error">
//          <p>There was an error!</p>
//          <p class="message">${err}</p>
//      </section>
//  `
//  };

// // ```html
// // <article class="card">
// //   <h2>CATEGORY</h2>
// //   <p>QUESTION</p>
// //   <button>Show Answer</button>
// //   <p class="hidden">CORRECT ANSWER</p>
// // </article>
// // ```





// // const showTrivia = (json) => {
// //     trivia.innerHTML = `
// //     <article class= "card">
// //         <img src="${json.sprites.front_shiny}" alt=${json.name} />
// //         <h2>${json.name}</h2>
// //     </article>
// // `
// // }
let form = document.querySelector("form")
const url = "https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple";

form.addEventListener("submit", (e) => {
    e.preventDefault()
    getQuestionInfo()
})




function questionFormat(qObject) {
    
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
            questionMaker(question)
        }
    })
}

function questionMaker(qObject) {
    let main = document.querySelector("main")
    let article = questionFormat(qObject)
    main.append(article)
}
