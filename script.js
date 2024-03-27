var interval;
var minutes = 25;
var seconds = 0;
var timerStarted = false;
var sessionHistory = []; // Array to store session history

function startTimer() {
  if (!timerStarted) {
    interval = setInterval(updateTimer, 1000);
    timerStarted = true;
    document.getElementById("startBtn").disabled = true;
    addSessionToHistory(); // Add session data to history when timer starts
  }
}

function stopTimer() {
  clearInterval(interval);
  timerStarted = false;
  document.getElementById("startBtn").disabled = false;
}

function resetTimer() {
  clearInterval(interval);
  minutes = 25;
  seconds = 0;
  updateDisplay();
  timerStarted = false;
  document.getElementById("startBtn").disabled = false;
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    stopTimer();
    alert("Time's up!");
    return;
  }
  
  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  updateDisplay();
}

function updateDisplay() {
  var timerElement = document.getElementById("timer");
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  timerElement.innerHTML = formattedMinutes + ":" + formattedSeconds;
}

function addSessionToHistory() {
  var currentTime = new Date().toLocaleTimeString();
  sessionHistory.push(currentTime); // Add current time to session history
  updateSessionHistory(); // Update session history display
}

function updateSessionHistory() {
  var historyElement = document.getElementById("sessionHistory");
  historyElement.innerHTML = ""; // Clear previous session history

  sessionHistory.forEach(function(session, index) {
    var listItem = document.createElement("li");
    listItem.textContent = "Session " + (index + 1) + ": " + session;
    historyElement.appendChild(listItem);
  });
}

// Event listeners for timer control buttons
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
