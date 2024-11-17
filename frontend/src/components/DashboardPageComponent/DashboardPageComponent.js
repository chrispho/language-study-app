import { Component } from "../Component/Component.js"


export class DashboardPageComponent extends Component {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data

  constructor() {
    super();
    this.loadCSS('DashboardPageComponent');
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

  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement('div');
    this.#container.classList.add('dashboard-view');
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard</title>
        <link rel="stylesheet" href="dashboard.css">
    </head>
    <body>
        <div class="dashboard">
            <h1>Dashboard</h1>
            
            <div class="main-container">
                <!-- Left: Recent Exercises -->
                <div class="recent-exercises">
                    <h2>Recent Exercises</h2>
                    <div class="exercises-grid">
                        <div class="exercise">
                            <h3>Exercise 2: Vegetables</h3>
                            <div class="progress-bar">
                                <div class="progress"></div>
                            </div>
                            <p>78% Completed</p>
                            <div class="buttons">
                                <button class="btn" id="exercise-continue-button">Continue</button>
                                <button class="btn">Restart</button>
                            </div>
                        </div>
                        <div class="exercise">
                            <h3>Exercise 3: Foods</h3>
                            <div class="progress-bar">
                                <div class="progress"></div>
                            </div>
                            <p>78% Completed</p>
                            <div class="buttons">
                                <button class="btn">Continue</button>
                                <button class="btn">Restart</button>
                            </div>
                        </div>
                        <div class="exercise">
                            <div class="test">
                                <h3>Exercise 4: Sports</h3>
                                <div class="progress-bar">
                                    <div class="progress"></div>
                                </div>
                                <p>78% Completed</p>
                                <div class="buttons">
                                    <button class="btn">Continue</button>
                                    <button class="btn">Restart</button>
                                </div>
                            </div>
                        </div>
                        <div class="exercise">
                            <h3>Exercise 5: Clothes</h3>
                            <div class="progress-bar">
                                <div class="progress"></div>
                            </div>
                            <p>78% Completed</p>
                            <div class="buttons">
                                <button class="btn">Continue</button>
                                <button class="btn">Restart</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Flashcards and Trophies -->
                <div class="right-panel">
                    <div class="recent-flashcards">
                        <h2>Recent Flashcards</h2>
                        <div class="flashcards-grid">
                            <div class="flashcard">
                                <h3>Sports</h3>
                                <div class="buttons">
                                    <button class="btn review-button">Review</button>
                                </div>
                            </div>
                            <div class="flashcard">
                                <h3>Drinks</h3>
                                <div class="buttons">
                                    <button class="btn">Review</button>
                                </div>
                            </div>
                            <div class="flashcard">
                                <h3>Clothes</h3>
                                <div class="buttons">
                                    <button class="btn review-button">Review</button>
                                </div>
                            </div>
                            <div class="flashcard">
                                <h3>Foods</h3>
                                <div class="buttons">
                                    <button class="btn review-button">Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="trophies">
                        <h2>Trophies</h2>
                        <div class="trophies-grid">
                            <div class="trophy">
                                <div class="trophy-icon">🏆<br></div> 
                                <div class="trophy-text">5 Day Streak</div>
                            </div>
                            <div class="trophy">
                                <div class="trophy-icon">🏆<br></div> 
                                <div class="trophy-text">5 Day Streak</div>
                            </div>
                            <div class="trophy">
                                <div class="trophy-icon">🏆<br></div> 
                                <div class="trophy-text">5 Day Streak</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>


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


    // const backToMainViewBtn = this.#container.querySelector('#backToMainViewBtn');

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
