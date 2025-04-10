function saveWorkout() {
  const workout = document.getElementById("workout-input").value;
  localStorage.setItem("myWorkout", workout);
  displayWorkout();
}

function displayWorkout() {
  const saved = localStorage.getItem("myWorkout");
  document.getElementById("saved-workout").textContent = saved || "None yet.";
}

window.onload = displayWorkout;

