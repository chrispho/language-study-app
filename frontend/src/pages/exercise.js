// script.js
const exerciseContainer = document.getElementById('exercise-container');

async function fetchAndDisplayExercises() {
  try {
    const exercises = 
    [{
      "type": "multiple_choice",
      "prompt": "What is the French word for 'cat'?",
      "options": [
        "chien",
        "chat",
        "oiseau",
        "poisson"
      ],
      "correctAnswer": 1
    }]

    exercises.forEach(exercise => {
      const exerciseElement = document.createElement('div');
      exerciseElement.innerHTML = `
        <h2>${exercise.prompt}</h2>
        <ul>
          ${exercise.options.map(option => `<li>${option}</li>`).join('')}
        </ul>
      `;
      exerciseContainer.appendChild(exerciseElement);
    });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    exerciseContainer.innerHTML = '<p>Error fetching exercises. Please try again later.</p>';
  }
}

fetchAndDisplayExercises();