// Variable for API
const TRIVIA_URL = "https://opentdb.com/api.php?amount=30";

// Locate button and input in HTML to target event listener
const button = document.querySelector("button");
const main = document.querySelector("main");
const categorySwitch = document.querySelector("#category");

button.addEventListener("click", (e) => {
  e.preventDefault();

  let difficulty;
  const difficulties = document.getElementsByName("difficulty");
  for (let i = 0; i < difficulties.length; i++) {
    if (difficulties[i].checked) {
      difficulty = difficulties[i].value;
    }
  }
  main.innerHTML = '<p style="color: white;">Loading...</p>';
  fetch(`${TRIVIA_URL}&category=${categorySwitch.value}&difficulty=${difficulty}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(decodeHtml(data.results[0].question));
      console.log(data.results[0].question);
      console.log("Difficulty: " + data.results[0].difficulty);
      showTrivia(data);
    })
    .catch((err) => {
      showError(err);
    });
});

const randomAnswerGenerator = (array) => {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const decodeHtml = (html) => {
  html = html.replace(/&apos;/g, "'").replace(/\$quot;/g, "\"");
  let textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  let decodedStr = textarea.value;
  return decodedStr;
};

function showTrivia(data) {
  main.innerHTML = "";

  data.results.forEach((question) => {
    console.log(decodeHtml(question.question));
    const card = document.createElement("article");
    card.classList.add("card");
    card.classList.add(question.difficulty);


    const category = document.createElement("h2");
    category.textContent = question.category;
    card.appendChild(category);

    const difficulty = document.createElement("p");
    difficulty.textContent = "Difficulty: " + question.difficulty;
    card.appendChild(difficulty);

    const questionText = document.createElement("p");
    questionText.textContent = decodeHtml(question.question);
    card.appendChild(questionText);

    let answers = [...question.incorrect_answers, question.correct_answer];
    randomAnswerGenerator(answers);

    const answerButtons = [];
    answers.forEach((answer) => {
      const answerButton = document.createElement("button");
      answerButton.textContent = decodeHtml(answer);
      answerButton.addEventListener("click", function () {
        checkAnswer(answer, question.correct_answer, answerButtons);
      });
      card.appendChild(answerButton);
      answerButtons.push(answerButton);
    });

    main.appendChild(card);
  });
}

const checkAnswer = (userAnswer, correctAnswer, answerButtons) => {
  const selectedButton = answerButtons.find((button) => button.textContent === decodeHtml(userAnswer));

  if (decodeHtml(userAnswer) === decodeHtml(correctAnswer)) {
    answerButtons.forEach((button) => {
      button.disabled = true;
      if (button.textContent === decodeHtml(correctAnswer)) {
        button.style.backgroundColor = "green";
      }
    });
  } else {
    selectedButton.style.backgroundColor = "red";
    selectedButton.disabled = true;
    }
  };


const showError = (err) => {
  main.innerHTML = `
    <section class="error">
    <p>An error has occurred!</p>
    <p class="message">${err}</p>
    </section>`;
};
