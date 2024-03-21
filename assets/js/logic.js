const timer = document.querySelector(".timer");
const questions = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choice = document.querySelector("#choices");
const starterScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start");
const submitButton = document.querySelector("#submit");
const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const initials = document.querySelector("#initials");

// Initialize variables
let secondsLeft = 60;
let score = 0;
let currentQuestionIndex = 0; // Use an index instead of `currentQuestion` 

// Start timer when start button is clicked
startButton.addEventListener("click", () => {
 unhideQuestions();
 startTimer();
});

// Timer countdown
function startTimer() {
 const timeInterval = setInterval(() => {
    if (secondsLeft > 0) {
      timer.textContent = `Time remaining: ${secondsLeft}`;
      secondsLeft--;
    } else {
      timer.textContent = "Times up!";
      clearInterval(timeInterval);
      gameOver();
    }
 }, 1000);
}

// Show questions and start quiz
function unhideQuestions() {
 starterScreen.classList.add("hide");
 questions.classList.remove("hide");
 showQuestions();
}

// Display questions and choices 
function showQuestions() {
   const currentQuestion = quiz[currentQuestionIndex]; // Get question by index 

   questionTitle.textContent = currentQuestion.question;
   choice.innerHTML = ''; // Clear choices

   currentQuestion.options.forEach(choiceText => { // Use 'options' from your data
       const optionButton = document.createElement("button");
       optionButton.textContent = choiceText;
       choice.appendChild(optionButton);
       optionButton.addEventListener("click", checkAnswer); // Updated function name
   });
}

// Handle answer selection 
function checkAnswer(event) { // Renamed for clarity 
     const selectedAnswer = event.target.textContent; 
     const correctSound = new Audio('./assets/sfx/correct.wav'); // Create new Audio object and play it if correct
     const incorrectSound = new Audio('./assets/sfx/incorrect.wav'); // played when incorret
 
     if (quiz[currentQuestionIndex].answer === selectedAnswer) {
         score += 5;
         feedback.textContent = "Correct Answer!";
         correctSound.play(); // Play correct sound
     } else {
         secondsLeft -= 10;
         feedback.textContent = "Better luck next time!";
         incorrectSound.play(); // Play incorrect sound
     }
 
     currentQuestionIndex++; // Update for next question 
     if (currentQuestionIndex < quiz.length) {
         showQuestions(); // Display the next question
     } else {
         gameOver(); // End the game if there are no more questions
     }
 }

// End game and show final score
function gameOver() {
 questions.classList.add("hide");
 endScreen.classList.remove("hide");
 finalScore.textContent = score;
}

// Submit score and redirect to highscores
submitButton.addEventListener("click", submit);
function submit(event) {
 event.preventDefault();
 endScreen.classList.add("hide");
 location.assign("./highscores.html");
 const userData = JSON.parse(localStorage.getItem("scores")) || [];
 userData.push({ initials: initials.value, finalScore: score });
 localStorage.setItem("scores", JSON.stringify(userData));
}
