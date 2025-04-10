const workoutInput = document.getElementById('workout-input');
const logButton = document.getElementById('log-button');
const workoutList = document.getElementById('workout-list');

// Load saved workouts
document.addEventListener('DOMContentLoaded', () => {
  const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
  savedWorkouts.forEach((workout, index) => addWorkoutToDOM(workout, index));
});

logButton.addEventListener('click', () => {
  const workout = workoutInput.value.trim();
  if (workout !== '') {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    savedWorkouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
    addWorkoutToDOM(workout, savedWorkouts.length - 1);
    workoutInput.value = '';
  }
});

function addWorkoutToDOM(workout, index) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${workout}
    <span class="delete-btn" data-index="${index}">&#128465;</span>
  `;
  workoutList.appendChild(li);
}

// Delete workout
workoutList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    workoutList.innerHTML = '';
    workouts.forEach((workout, idx) => addWorkoutToDOM(workout, idx));
  }
});
