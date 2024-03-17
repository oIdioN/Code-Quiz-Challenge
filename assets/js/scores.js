var highScores = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear");

function clearScores (){
   localStorage.clear("scores")
   highScores.innerHTML = ""
   }

function displayHighscores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || []; // Get scores or use an empty array

    highScores.innerHTML = ""; // Clear previous highscores

    scores.forEach(data => {
        const li = document.createElement("li");
        li.textContent = `${data.initials} - ${data.finalScore}`; // String interpolation
        highScores.appendChild(li);
    });
}

displayHighscores(); 