import { EventHub } from "../../eventhub/EventHub";
import { Events } from "../../eventhub/Events";
// TODO add imports for each component

export class AppControllerComponent {
  #container = null; // Private container for the component
  #currentView = "main"; // Track the current view ('main' or 'simple')
  // #taskListComponent = null; // Instance of the main task list component
  #hub = null; // EventHub instance for managing events

  constructor() {
    this.#hub = EventHub.getInstance();
    // this.#taskListComponent = new TaskListComponent();
    // TODO add variables for each page/component
  }

  // Render the AppController component and return the container
  render() {
    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    // Initially render the main view
    this.#renderCurrentView();

    return this.#container;
  }

  // Creates the main container element
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("app-controller");
  }

  // Sets up the HTML structure for the container
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div id="viewContainer"></div>
      <button id="switchViewBtn">Switch to Simple View</button>
    `; // TODO whoever is making multiui view: add more buttons for each page
  }

  // Attaches the necessary event listeners
  #attachEventListeners() {
    // TODO whoever is making multiui view: add multiple buttons and then add listeners to publish the corresponding events
    // const switchViewBtn = this.#container.querySelector("#switchViewBtn");

    // switchViewBtn.addEventListener("click", () => {
    //   this.#hub.publish(Events.SwitchToSomePage)
    // });

    // Subscribe to events from the EventHub to manage switching
    // this.#hub.subscribe('SwitchToMainView', () => {
    //   this.#currentView = 'main';
    //   this.#renderCurrentView();
    // });
  }

  // Renders the current view based on the #currentView state
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector("#viewContainer");
    viewContainer.innerHTML = ""; // Clear existing content

    switch (this.#currentView) {
      case "main":
        // viewContainer.appendChild(this.#mainpagecomponent.render())
        break;
    }
  }
}
