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
    this.#container.innerHTML = `
      <div class="container">
      <h1>LET'S PRACTICE!</h1>
      <p class="exercise-type">Q1. Choose the correct option</p>
      <div class="question-box">
          <p>Your friend tells you, <em>Son las siete y cinco.</em> What time is it?</p>
          <label>
            <input type="radio" name="answer" value="5:17">
            5:17
          </label>
          <label>
            <input type="radio" name="answer" value="7:15">
            7:15
          </label>
          <label>
            <input type="radio" name="answer" value="5:07">
            5:07
          </label> 
          <label>
            <input type="radio" name="answer" value="7:05">
            7:05
          </label> 
          <div>
            <button class="submit-btn">SUBMIT</button>
          </div>
      </div>
        <div class="feedback-panel">
            <button class="try-again-btn">TRY AGAIN</button>
            <button class="correct-btn">CORRECT</button>
            <button class="next-btn">NEXT</button>
        </div>
      </div>

    `;// TODO add inputs here
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

    // const submitBtn = document.getElementsByClassName("submit-btn")
    // submitBtn.addEventListener("onclick", () => {
      
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
