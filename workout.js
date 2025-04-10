function saveWorkout() {
  const workout = document.getElementById("workout-input").value;
  localStorage.setItem("myWorkout", workout);
}

function loadWorkout() {
  const saved = localStorage.getItem("myWorkout");
  document.getElementById("workout-input").value = saved || "";
}

window.onload = loadWorkout;
