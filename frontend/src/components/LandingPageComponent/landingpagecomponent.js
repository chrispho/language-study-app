import { Component } from "../Component/Component.js"

export class LandingPageComponent extends Component {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data

  constructor() {
    super();
    // this.loadCSS('TranslationPageComponent');
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
    this.#container.classList.add('translation-view');
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <main class="main-content">
        <h1 class="content" data-key="title">Welcome to the Language Study App!</h1>
    <p class="content" data-key="description">
        Language-Study-App offers personalized paths that adapt to your schedules. Features like flashcards and progress tracking help you focus on what matters most.
    </p>

    <!-- Image Container -->
    <div class="image-container">
        <img src="language-study-app/frontend/public/images/translate.png" alt="Translate" class="feature-image">
        <img src="language-study-app/frontend/public/images/exercises.png" alt="Exercises" class="feature-image">
        <img src="language-study-app/frontend/public/images/progress.png" alt="Progress" class="feature-image">
    </div>

    <!-- Buttons Container -->
    <div class="button-container">
        <button class="action-button">JOIN NOW</button>
        <button class="action-button">LOG IN</button>
    </div>
    </main>
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