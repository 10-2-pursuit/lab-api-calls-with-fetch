const form = document.getElementById("triviaForm");
const questionsContainer = document.getElementById("questionsContainer");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getTriviaQuestions();
});

function getTriviaQuestions() {
  const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const questions = data.results;
      displayQuestions(questions);
    })
    .catch((error) => console.log(error));
}

function displayQuestions(questions) {
  questionsContainer.innerHTML = "";
  questions.forEach((question) => {
    const card = createCard(question);
    questionsContainer.appendChild(card);
  });
}

function createCard(question) {
  const card = document.createElement("article");
  card.classList.add("card");

  const category = document.createElement("h2");
  category.textContent = question.category;

  const questionText = document.createElement("p");
  questionText.textContent = question.question;

  const showAnswerBtn = document.createElement("button");
  showAnswerBtn.textContent = "Show Answer";

  card.appendChild(category);
  card.appendChild(questionText);
  card.appendChild(showAnswerBtn);

  // Event delegation for "Show Answer" button
  questionsContainer.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement === showAnswerBtn) {
      const answer = document.createElement("p");
      answer.textContent = question.correct_answer;
      card.appendChild(answer);
    }
  });

  return card;
}