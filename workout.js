function logWorkout() {
  const input = document.getElementById("workout-input");
  const workout = input.value.trim();

  if (workout === "") return;

  let workouts = JSON.parse(localStorage.getItem("workoutLogs")) || [];

  // Add new workout
  workouts.push({
    text: workout,
    timestamp: new Date().toLocaleString()
  });

  localStorage.setItem("workoutLogs", JSON.stringify(workouts));
  input.value = "";
  renderWorkouts();
}

function renderWorkouts() {
  const list = document.getElementById("workout-list");
  list.innerHTML = "";

  const workouts = JSON.parse(localStorage.getItem("workoutLogs")) || [];

  workouts.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.text} (${entry.timestamp})`;
    list.appendChild(li);
  });
}

// Load workouts when page opens
window.onload = renderWorkouts;
