// API endpoint
const TRIVIA_URL = "https://opentdb.com/api.php?amount=10";

//Create a card element for a trivia question
function createCard(question) {
  const article = document.createElement('article');
  article.className = 'card';

  const category = document.createElement('h2');
  category.innerHTML = question.category;

  const questionText = document.createElement('p');
  questionText.innerText = question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  const showAnswerBtn = document.createElement('button');
  showAnswerBtn.innerHTML = 'Show Answer';

  const correctAnswer = document.createElement('p');
  correctAnswer.className = 'hidden';
  correctAnswer.innerText = question.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  showAnswerBtn.addEventListener('click', () => {
    correctAnswer.classList.remove('hidden');
  });

  article.appendChild(category);
  article.appendChild(questionText);
  article.appendChild(showAnswerBtn);
  article.appendChild(correctAnswer);

  return article;
}

// Function to place 10 cards on the page
function renderTriviaCards(questions) {
  const main = document.querySelector('main');
  main.innerHTML = ''; 

  questions.forEach(question => {
    const article = createCard(question);
    article.classList.add(question.difficulty); //add class of difficulty to express color borders
    main.appendChild(article);
  });
}

// Fetch trivia questions from the API based on category
function fetchTriviaQuestions(category) {
  let url = TRIVIA_URL;
  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error retrieving trivia questions');
      }
    })
    .then(data => {
      const questions = data.results;
      renderTriviaCards(questions);
    })
    .catch(error => {
      console.error('Error retrieving trivia questions:', error);
    });
}

// Attach event listener to the form
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault(); 
  const category = form.category.value;
  fetchTriviaQuestions(category);
});
