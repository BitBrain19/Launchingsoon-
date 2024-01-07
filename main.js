const launchDate = new Date("January 14, 2024 00:00:00 UTC").getTime();
const progressBarElement = document.querySelector("#progress-bar div");
const timerElement = document.getElementById("timer");
const formElement = document.getElementById("subscribeForm");
const statusElement = document.getElementById("subscriptionStatus");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailInput = formElement.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  const isValidEmail = validateEmail(email); // Add a function to validate email

  if (isValidEmail) {
    // Successful submission
    statusElement.textContent = `Thank you for subscribing, ${email}!`;
    statusElement.style.color = "#70F1A1"; // Primary color
  } else {
    // Invalid submission
    statusElement.textContent = "Please enter a valid email address.";
    statusElement.style.color = "#FF0000"; // Red color
  }
});

// Function to validate email format
function validateEmail(email) {
  // Use a regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function calculateProgress(timeRemaining) {
  if (timeRemaining <= 0) {
    return 100;
  } else if (timeRemaining >= 10 * 24 * 60 * 60 * 1000) {
    return 2;
  } else if (timeRemaining >= 9 * 24 * 60 * 60 * 1000) {
    return 5;
  } else if (timeRemaining >= 8 * 24 * 60 * 60 * 1000) {
    return 10;
  } else if (timeRemaining >= 7 * 24 * 60 * 60 * 1000) {
    return 20;
  } else if (timeRemaining >= 6 * 24 * 60 * 60 * 1000) {
    return 30;
  } else if (timeRemaining >= 5 * 24 * 60 * 60 * 1000) {
    return 40;
  } else if (timeRemaining >= 4 * 24 * 60 * 60 * 1000) {
    return 50;
  } else if (timeRemaining >= 3 * 24 * 60 * 60 * 1000) {
    return 75;
  } else if (timeRemaining >= 2 * 24 * 60 * 60 * 1000) {
    return 85;
  } else {
    return 95;
  }
}

function updateProgressBarAndTimer() {
  const now = new Date().getTime();
  const timeRemaining = launchDate - now;

  // Calculate the progress based on the specified rules
  const progress = calculateProgress(timeRemaining);

  // Set the width of the progress bar
  progressBarElement.style.width = `${progress}%`;

  // Update the countdown timer
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  timerElement.textContent = `${days}D ${hours}H ${minutes}M ${seconds}S`;

  if (timeRemaining < 0) {
    clearInterval(timerInterval);
    progressBarElement.style.width = "100%"; // Set progress to 100% if launch has occurred
    timerElement.textContent = "We've Launched!";
  }
}

// Initial call to avoid delay
updateProgressBarAndTimer();

// Update the progress bar and timer every second
const timerInterval = setInterval(updateProgressBarAndTimer, 1000);
