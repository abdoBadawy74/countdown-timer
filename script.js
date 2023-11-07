let countdown;
let timerRunning = false;
let endTime;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const countdownDisplay = document.getElementById('countdown');
const minutesInput = document.getElementById('minutes');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  if (!timerRunning) {
    const minutes = parseInt(minutesInput.value, 10);
    if (isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid number of minutes.');
      return;
    }

    endTime = Date.now() + minutes * 60 * 1000;

    timerRunning = true;
    startButton.disabled = true;

    countdown = setInterval(updateCountdown, 1000);
    updateCountdown();
  }
}

function stopTimer() {
  if (timerRunning) {
    clearInterval(countdown);
    timerRunning = false;
    startButton.disabled = false;
  }
}

function resetTimer() {
  clearInterval(countdown);
  timerRunning = false;
  startButton.disabled = false;
  minutesInput.value = '';
  countdownDisplay.textContent = '00:00';
}

function updateCountdown() {
  const timeLeft = endTime - Date.now();
  if (timeLeft <= 0) {
    clearInterval(countdown);
    countdownDisplay.textContent = '00:00';
    timerRunning = false;
    startButton.disabled = false;
  } else {
    displayTime(timeLeft);
  }
}

function displayTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
