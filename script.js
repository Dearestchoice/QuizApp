// DOM Elements
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
const timerElement = document.getElementById("timer");
const answeredElement = document.getElementById("answered");
const remainingElement = document.getElementById("remaining");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20; // seconds per question
let timerInterval;
let quizInProgress = false;

// Total questions count (update if the questions array changes)
const totalQuestions = 50;
remainingElement.innerText = totalQuestions;

// Array of 50 general knowledge questions
const questions = [
  {
    question: "Who is the current President of the United States?",
    answers: [
      { text: "Joe Biden", correct: true },
      { text: "Donald Trump", correct: false },
      { text: "Barack Obama", correct: false },
      { text: "George Bush", correct: false }
    ]
  },
  {
    question: "What is the capital of the United States?",
    answers: [
      { text: "New York", correct: false },
      { text: "Los Angeles", correct: false },
      { text: "Washington, D.C.", correct: true },
      { text: "Chicago", correct: false }
    ]
  },
  {
    question: "How many continents are there on Earth?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Which ocean is the largest?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ]
  },
  {
    question: "What is the national currency of Japan?",
    answers: [
      { text: "Won", correct: false },
      { text: "Yuan", correct: false },
      { text: "Yen", correct: true },
      { text: "Ringgit", correct: false }
    ]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false }
    ]
  },
  {
    question: "Which country is famous for the Great Wall?",
    answers: [
      { text: "India", correct: false },
      { text: "China", correct: true },
      { text: "Japan", correct: false },
      { text: "Russia", correct: false }
    ]
  },
  {
    question: "How many players are on a standard soccer team?",
    answers: [
      { text: "9", correct: false },
      { text: "10", correct: false },
      { text: "11", correct: true },
      { text: "12", correct: false }
    ]
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false }
    ]
  },
  {
    question: "What is the world's longest river?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Mississippi River", correct: false },
      { text: "Yangtze River", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Michelangelo", correct: false }
    ]
  },
  {
    question: "Which planet is closest to the Sun?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mercury", correct: true },
      { text: "Earth", correct: false },
      { text: "Mars", correct: false }
    ]
  },
  {
    question: "What is the national sport of the USA?",
    answers: [
      { text: "Soccer", correct: false },
      { text: "Baseball", correct: true },
      { text: "Basketball", correct: false },
      { text: "Football", correct: false }
    ]
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [
      { text: "China", correct: false },
      { text: "South Korea", correct: false },
      { text: "Japan", correct: true },
      { text: "Thailand", correct: false }
    ]
  },
  {
    question: "How many hours are there in a day?",
    answers: [
      { text: "12", correct: false },
      { text: "24", correct: true },
      { text: "36", correct: false },
      { text: "48", correct: false }
    ]
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Iron", correct: false },
      { text: "Diamond", correct: true },
      { text: "Platinum", correct: false }
    ]
  },
  {
    question: "What do bees produce?",
    answers: [
      { text: "Milk", correct: false },
      { text: "Honey", correct: true },
      { text: "Sugar", correct: false },
      { text: "Wax", correct: false }
    ]
  },
  {
    question: "Which gas do plants use for photosynthesis?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Vancouver", correct: false },
      { text: "Montreal", correct: false }
    ]
  },
  {
    question: "Who invented the telephone?",
    answers: [
      { text: "Thomas Edison", correct: false },
      { text: "Nikola Tesla", correct: false },
      { text: "Alexander Graham Bell", correct: true },
      { text: "Albert Einstein", correct: false }
    ]
  },
  {
    question: "Which country won the 2022 FIFA World Cup?",
    answers: [
      { text: "Brazil", correct: false },
      { text: "Germany", correct: false },
      { text: "Argentina", correct: true },
      { text: "France", correct: false }
    ]
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    answers: [
      { text: "Tiger", correct: false },
      { text: "Lion", correct: true },
      { text: "Elephant", correct: false },
      { text: "Leopard", correct: false }
    ]
  },
  {
    question: "What does 'HTTP' stand for?",
    answers: [
      { text: "Hyper Transfer Text Protocol", correct: false },
      { text: "HyperText Transfer Protocol", correct: true },
      { text: "Hyperlink Transfer Text Protocol", correct: false },
      { text: "High Transfer Text Protocol", correct: false }
    ]
  },
  {
    question: "Who is the founder of Microsoft?",
    answers: [
      { text: "Bill Gates", correct: true },
      { text: "Steve Jobs", correct: false },
      { text: "Mark Zuckerberg", correct: false },
      { text: "Larry Page", correct: false }
    ]
  },
  {
    question: "What is the largest country in the world by area?",
    answers: [
      { text: "Russia", correct: true },
      { text: "Canada", correct: false },
      { text: "China", correct: false },
      { text: "United States", correct: false }
    ]
  },
  {
    question: "Which country is famous for its tulips and windmills?",
    answers: [
      { text: "Belgium", correct: false },
      { text: "Netherlands", correct: true },
      { text: "Denmark", correct: false },
      { text: "Sweden", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "O2", correct: false },
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "HO", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "What is the capital of Italy?",
    answers: [
      { text: "Milan", correct: false },
      { text: "Naples", correct: false },
      { text: "Venice", correct: false },
      { text: "Rome", correct: true }
    ]
  },
  {
    question: "Who wrote the play 'Hamlet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Christopher Marlowe", correct: false },
      { text: "Ben Jonson", correct: false },
      { text: "John Webster", correct: false }
    ]
  },
  {
    question: "Which language is most widely spoken in the world?",
    answers: [
      { text: "English", correct: false },
      { text: "Hindi", correct: false },
      { text: "Mandarin Chinese", correct: true },
      { text: "Spanish", correct: false }
    ]
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Kangchenjunga", correct: false },
      { text: "Lhotse", correct: false }
    ]
  },
  {
    question: "Which country is known for its pyramids?",
    answers: [
      { text: "Mexico", correct: false },
      { text: "Egypt", correct: true },
      { text: "Peru", correct: false },
      { text: "Sudan", correct: false }
    ]
  },
  {
    question: "Who is known as the father of modern physics?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Niels Bohr", correct: false }
    ]
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false }
    ]
  },
  {
    question: "In what year did World War II end?",
    answers: [
      { text: "1945", correct: true },
      { text: "1939", correct: false },
      { text: "1918", correct: false },
      { text: "1965", correct: false }
    ]
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "African Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Humpback Whale", correct: false }
    ]
  },
  {
    question: "Who painted the ceiling of the Sistine Chapel?",
    answers: [
      { text: "Leonardo da Vinci", correct: false },
      { text: "Raphael", correct: false },
      { text: "Michelangelo", correct: true },
      { text: "Donatello", correct: false }
    ]
  },
  {
    question: "What is the capital of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Perth", correct: false }
    ]
  },
  {
    question: "What gas do humans breathe in that is essential for survival?",
    answers: [
      { text: "Carbon Dioxide", correct: false },
      { text: "Hydrogen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Oxygen", correct: true }
    ]
  },
  {
    question: "What is the freezing point of water in Celsius?",
    answers: [
      { text: "-10°C", correct: false },
      { text: "0°C", correct: true },
      { text: "32°C", correct: false },
      { text: "100°C", correct: false }
    ]
  },
  {
    question: "Which planet has the most moons?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Saturn", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Neptune", correct: false }
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Sahara Desert", correct: false },
      { text: "Arabian Desert", correct: false },
      { text: "Gobi Desert", correct: false },
      { text: "Antarctica", correct: true }
    ]
  },
  {
    question: "Who discovered penicillin?",
    answers: [
      { text: "Marie Curie", correct: false },
      { text: "Alexander Fleming", correct: true },
      { text: "Louis Pasteur", correct: false },
      { text: "Gregor Mendel", correct: false }
    ]
  },
  {
    question: "What is the main ingredient in guacamole?",
    answers: [
      { text: "Tomato", correct: false },
      { text: "Avocado", correct: true },
      { text: "Onion", correct: false },
      { text: "Lime", correct: false }
    ]
  },
  {
    question: "Which U.S. state is known as the 'Sunshine State'?",
    answers: [
      { text: "California", correct: false },
      { text: "Florida", correct: true },
      { text: "Texas", correct: false },
      { text: "Arizona", correct: false }
    ]
  },
  {
    question: "What is the smallest country in the world by area?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "Nauru", correct: false },
      { text: "Vatican City", correct: true },
      { text: "San Marino", correct: false }
    ]
  },
  {
    question: "Which ocean is the smallest?",
    answers: [
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: true },
      { text: "Southern Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false }
    ]
  },
  {
    question: "Who was the first person to step on the Moon?",
    answers: [
      { text: "Buzz Aldrin", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "Yuri Gagarin", correct: false },
      { text: "Alan Shepard", correct: false }
    ]
  },
  {
    question: "What is the primary language spoken in Brazil?",
    answers: [
      { text: "Spanish", correct: false },
      { text: "English", correct: false },
      { text: "Portuguese", correct: true },
      { text: "French", correct: false }
    ]
  }
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 20;
  scoreDisplay.innerText = `Score: ${score}`;
  nextButton.innerText = "Next";
  nextButton.style.display = "none";
  quizInProgress = true;
  updateProgress();
  showQuestion();
}

function showQuestion() {
  resetState();
  updateProgress();

  // Reset timer
  timeLeft = 20;
  timerElement.innerText = timeLeft;
  startTimer();

  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  // Create full-width answer buttons (vertically arranged)
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.setAttribute("data-correct", answer.correct);
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      revealCorrectAnswer();
      disableOptions();
      nextButton.style.display = "block";
    }
  }, 1000);
}

function disableOptions() {
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
}

function revealCorrectAnswer() {
  Array.from(answerButtons.children).forEach(btn => {
    if (btn.getAttribute("data-correct") === "true") {
      btn.classList.add("correct");
    }
  });
}

function selectAnswer(button, isCorrect) {
  clearInterval(timerInterval);
  
  if (isCorrect) {
    button.classList.add("correct");
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
  } else {
    button.classList.add("wrong");
    revealCorrectAnswer();
  }
  
  disableOptions();
  nextButton.style.display = "block";
}

function updateProgress() {
  // Answered = currentQuestionIndex; Remaining = totalQuestions - currentQuestionIndex
  answeredElement.innerText = currentQuestionIndex;
  remainingElement.innerText = totalQuestions - currentQuestionIndex;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    quizInProgress = false;
    alert(`Quiz Completed! Your Score: ${score} out of ${questions.length}`);
    // Return to start screen (all in one view)
    startScreen.style.display = "block";
    quizScreen.style.display = "none";
  }
});

// Prevent exiting while quiz is in progress
window.addEventListener("beforeunload", function (e) {
  if (quizInProgress) {
    e.preventDefault();
    e.returnValue = "";
  }
});

// Start quiz on button click
startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  startQuiz();
});
