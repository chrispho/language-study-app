// script.js
const exerciseContainer = document.getElementById('exercise-container');

async function fetchAndDisplayExercises() {
  try {
    let index = 0
    const exerciseData = 
    {
      "type": "multiple_choice",
      "prompt": "What is the French word for 'cat'?",
      "options": [
        "chien",
        "chat",
        "oiseau",
        "poisson"
      ],
      "correctAnswer": 1
    }

    const exerciseElement = document.createElement('div');
    const typeButton1 = document.createElement('button')
    typeButton1.textContent = "multiple_choice"
    typeButton1.onclick = () => {index = 0}
    exerciseElement.append(typeButton1)
    const typeButton2 = document.createElement('button')
    typeButton2.textContent = "fill_blank"
    typeButton2.onclick = () => {index = 1}
    exerciseElement.append(typeButton2)
    const typeButton3 = document.createElement('button')
    typeButton3.textContent = "matching"
    typeButton3.onclick = () => {index = 2}
    exerciseElement.append(typeButton3)
    
    const { type, prompt, options, correctAnswer } = exerciseData;

    // Create the prompt element
    const promptElement = document.createElement('p');
    promptElement.textContent = prompt;

    // Create the options and input elements
    const optionsContainer = document.createElement('div');
    options.forEach((option, index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      const optionText = document.createElement('span');

      input.type = 'radio';
      input.name = 'answer';
      input.value = index;

      optionText.textContent = option;

      label.appendChild(input);
      label.appendChild(optionText);
      optionsContainer.appendChild(label);
    });

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';

    // Append elements to the exercise container
    exerciseElement.appendChild(promptElement);
    exerciseElement.appendChild(optionsContainer);
    exerciseElement.appendChild(submitButton);
    exerciseContainer.appendChild(exerciseElement);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    exerciseContainer.innerHTML = '<p>Error fetching exercises. Please try again later.</p>';
  }
}

fetchAndDisplayExercises();