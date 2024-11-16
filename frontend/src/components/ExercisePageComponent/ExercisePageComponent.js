import { Component } from "../Component/Component.js"

export class ExercisePageComponent extends Component {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data

  constructor() {
    super();
    this.loadCSS('ExercisePageComponent');
  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  // Method to set the list of tasks to display
  // setTasks(tasks) {
  //   this.#tasks = tasks;
  //   this.#renderTasks();
  // }

  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('exercise-view');
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');

    // Create the heading and paragraph
    const heading = document.createElement('h1');
    heading.textContent = 'LET\'S PRACTICE!';
    const exerciseType = document.createElement('p');
    exerciseType.classList.add('exercise-type');
    exerciseType.textContent = 'Q1. Choose the correct option';

    // Create the question box
    const questionBox = document.createElement('div');
    questionBox.classList.add('question-box');

    // Create the question and answer options
    const question = document.createElement('p');
    question.innerHTML = 'Your friend tells you, <b><em>Son las siete y cinco.</em></b> What time is it?';
    const answerOptions = document.createElement('div');

    // Create individual answer options
    const options = [
      { value: '5:17', correct: false},
      { value: '7:15', correct: false},
      { value: '5:07', correct: false},
      { value: '7:05', correct: true}
    ];

    options.forEach(option => {
      const optionBox = document.createElement('button');
      optionBox.classList.add('option-box');
      optionBox.classList.add(option.correct ? 'correct-option' : 'incorrect-option')
      const optionText = document.createTextNode(option.value);

      optionBox.addEventListener('click', () => {
        // Remove the 'selected' class from all option boxes
        const optionBoxes = document.querySelectorAll('.option-box');
        optionBoxes.forEach(box => box.classList.remove('selected'));

        // Add the 'selected' class to the clicked option box
        optionBox.classList.add('selected');
      });
      optionBox.appendChild(optionText);
      answerOptions.appendChild(optionBox);
    });

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-btn');
    submitButton.textContent = 'SUBMIT';
    const submitButtonContainer = document.createElement('div');
    submitButtonContainer.appendChild(submitButton);

    // Append elements to the question box
    questionBox.appendChild(question);
    questionBox.appendChild(answerOptions);
    questionBox.appendChild(submitButtonContainer);

    // Create the feedback panel
    const feedbackPanel = document.createElement('div');
    feedbackPanel.classList.add('feedback-panel');

    // Create the try again and next buttons
    const tryAgainButton = document.createElement('button');
    tryAgainButton.classList.add('try-again-btn');
    tryAgainButton.textContent = 'TRY AGAIN';
    const nextButton = document.createElement('button');
    nextButton.classList.add('next-btn');
    nextButton.textContent = 'NEXT';

    // Append buttons to the feedback panel
    feedbackPanel.appendChild(tryAgainButton);
    feedbackPanel.appendChild(nextButton);

    // Append all elements to the main container
    mainContainer.appendChild(heading);
    mainContainer.appendChild(exerciseType);
    mainContainer.appendChild(questionBox);
    mainContainer.appendChild(feedbackPanel);

    this.#container.appendChild(mainContainer)
  }

  // Renders the tasks in the list
  // #renderTasks() {
  //   const taskList = this.#container.querySelector('#simpleTaskList');
  //   taskList.innerHTML = ''; // Clear existing content

  //   this.#tasks.forEach(taskData => {
  //     const taskContainer = document.createElement('li');
  //     taskContainer.classList.add('task-item');
      
  //     // Create a new TaskComponent for each task
  //     const task = new TaskComponent(taskData);
  //     taskContainer.appendChild(task.render());
  //     taskList.appendChild(taskContainer);
  //   });
  // }

  // Attaches the event listeners to the component
  #attachEventListeners() {
    const backToMainViewBtn = this.#container.querySelector('#backToMainViewBtn');

    const submitBtn = this.#container.getElementsByClassName("submit-btn")
    const feedbackPanel = this.#container.getElementsByClassName("feedback-panel")
    submitBtn[0].addEventListener("click", () => {
      feedbackPanel[0].classList.add("visible");
      const options = this.#container.getElementsByClassName("option-box")
      console.log(options)
      for (let i = 0; i < options.length; i++) {
        options[i].classList.add("submitted")
      }
    })
    const tryAgain = this.#container.getElementsByClassName("try-again-btn")
    tryAgain[0].addEventListener("click", () => {
      feedbackPanel[0].classList.remove("visible");
      const options = this.#container.getElementsByClassName("option-box")
      for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("submitted")
        options[i].classList.remove("selected")
      }
    })
    const nextButton = this.#container.getElementsByClassName("next-btn")
    nextButton[0].addEventListener("click", () => {
      
    })
      
    // })

    // const hub = EventHub.getInstance();
    // hub.subscribe(Events.NewTask, (taskData) => {
    //   this.#tasks.push(taskData);      
    //   this.#renderTasks();
    // });

    // hub.subscribe(Events.UnStoreTasks, () => {
    //   this.#tasks = [];
    //   this.#renderTasks();
    // });
  }
}