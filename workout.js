function saveWorkout() {
  const input = document.getElementById('workout-input').value;
  if (input.trim() === "") {
    alert("Please enter something!");
    return;
  }
  localStorage.setItem('workoutLog', input);
  document.getElementById('saved-workout').textContent = input;
  document.getElementById('workout-input').value = "";
}

// Load saved workout on page load
window.onload = () => {
  const saved = localStorage.getItem('workoutLog');
  if (saved) {
    document.getElementById('saved-workout').textContent = saved;
  }
};
