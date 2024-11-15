import { EventHub } from "../../eventhub/EventHub.js";
import { LandingPageComponent } from "../LandingPageComponent/landingpagecomponent.js";
import { ExercisePageComponent } from "../ExercisePageComponent/ExercisePageComponent.js";
// import { Events } from "../../eventhub/Events";
// TODO add imports for each component

export class AppControllerComponent {
  #container = null; // Private container for the component
  #currentView = "main"; // Track the current view ('main' or 'simple')
  #landingPageComponent = null; // Instance of the main task list component
  #exercisePageComponent = null;
  #hub = null; // EventHub instance for managing events

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#landingPageComponent = new LandingPageComponent();
    this.#exercisePageComponent = new ExercisePageComponent();
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
      <header>
      <img class="logo" src="language-study-app/frontend/public/images/logo.png" alt="logo">
      <nav>
          <ul class="nav__links">
              <li class="dropdown"><a href="#" id="language-select">Select Language</a>
                  <ul class="dropdown-content">
                      <li><a href="#" class="language-option" data-language="Spanish">Spanish</a></li>
                      <li><a href="#" class="language-option" data-language="English">English</a></li>
                      <li><a href="#" class="language-option" data-language="French">French</a></li>
                      <li><a href="#" class="language-option" data-language="German">German</a></li>
                  </ul>
              </li>
              <li><a href="#">Flashcard</a></li>
              <li><a href="#">Exercises</a></li>
              <li><a href="#">Translate</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
          </ul>
      </nav>
      <div class="profile-container">
          <button class="profile-button" onclick="toggleProfileMenu()">👤</button>
          <div class="profile-dropdown" id="profileDropdown">
              <ul>
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Settings</a></li>
                  <li><a href="#">Logout</a></li>
              </ul>
          </div>
      </div>
  </header>
    <div id="viewContainer"></div>
    <footer class="footer">
      All rights reserved © Language Study App
  </footer>
    `; // TODO whoever is making multiui view: add more buttons for each page
    // <button id="switchViewBtn">Switch to Simple View</button>
  }

  // Attaches the necessary event listeners
  #attachEventListeners() {
    // TODO whoever is making multiui view: add multiple buttons and then add listeners to publish the corresponding events
    // const switchViewBtn = this.#container.querySelector("#switchViewBtn");
    
// Redirect to the homepage when the logo is clicked
const logo = this.#container.querySelector('.logo');
logo.addEventListener('click', () => {
  this.#hub.publish('RedirectToHomepage');
});

// Subscribe to the 'RedirectToHomepage' event and handle the redirection
this.#hub.subscribe('RedirectToHomepage', () => {
  window.location.href = 'index.html';
});

// Profile Menu Functionality
const profileButton = this.#container.querySelector('.profile-button');
const profileDropdown = this.#container.querySelector('#profileDropdown');

// Toggle profile menu when the button is clicked
profileButton.addEventListener('click', () => {
  this.#hub.publish('ToggleProfileMenu');
});

// Subscribe to 'ToggleProfileMenu' and toggle visibility of profile dropdown
this.#hub.subscribe('ToggleProfileMenu', () => {
  profileDropdown.style.display =
    profileDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close the profile menu when clicking outside of it
window.addEventListener('click', (event) => {
  if (!profileDropdown.contains(event.target) && event.target !== profileButton) {
    this.#hub.publish('CloseProfileMenu');
  }
});

// Subscribe to 'CloseProfileMenu' to hide the dropdown
this.#hub.subscribe('CloseProfileMenu', () => {
  profileDropdown.style.display = 'none';
});

// Language Selection Functionality
const languageSelection = this.#container.querySelector('#language-select');
const languageOptions = this.#container.querySelectorAll('.language-option');

// Update selected language when a language option is clicked
languageOptions.forEach((option) => {
  option.addEventListener('click', (event) => {
    event.preventDefault();
    this.#hub.publish('LanguageChanged', {
      selectedLanguage: option.getAttribute('data-language'),
    });
  });
});

// Subscribe to 'LanguageChanged' and update the language selection text
this.#hub.subscribe('LanguageChanged', (data) => {
  languageSelection.textContent = data.selectedLanguage;
});
}

  // Renders the current view based on the #currentView state
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector("#viewContainer");
    viewContainer.innerHTML = ""; // Clear existing content

    switch (this.#currentView) {
      case "main":
        viewContainer.appendChild(this.#exercisePageComponent.render())
        // viewContainer.appendChild(this.#mainpagecomponent.render())
        break;
    }
  }
}
