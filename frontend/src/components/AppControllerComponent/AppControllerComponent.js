import { EventHub } from "../../eventhub/EventHub.js";
import { LandingPageComponent } from "../LandingPageComponent/LandingPageComponent.js";
import { ExercisePageComponent } from "../ExercisePageComponent/ExercisePageComponent.js";
import { TranslationPageComponent } from "../TranslationPageComponent/TranslationPageComponent.js";
import { Events } from "../../eventhub/Events.js";
// TODO add imports for each component

export class AppControllerComponent {
  #container = null; // Private container for the component
  #currentView = "main"; // Track the current view ('main' or 'simple')
  #landingPageComponent = null;
  #exercisePageComponent = null;
  #translationPageComponent = null;
  #hub = null; // EventHub instance for managing events

  constructor() {
    this.#hub = EventHub.getInstance();
    this.#landingPageComponent = new LandingPageComponent();
    this.#exercisePageComponent = new ExercisePageComponent();
    this.#translationPageComponent = new TranslationPageComponent();
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
              <li class="dropdown"><a id="language-select">Select Language</a>
                  <ul class="dropdown-content">
                      <li><a class="language-option" data-language="Spanish">Spanish</a></li>
                      <li><a class="language-option" data-language="English">English</a></li>
                      <li><a class="language-option" data-language="French">French</a></li>
                      <li><a class="language-option" data-language="German">German</a></li>
                  </ul>
              </li>
              <li id="flashcard"><a>Flashcard</a></li>
              <li id="exercise"><a>Exercises</a></li>
              <li id="translate"><a>Translate</a></li>
              <li id="about"><a>About Us</a></li>
              <li id="contact"><a>Contact</a></li>
          </ul>
      </nav>
      <div class="profile-container">
          <button class="profile-button" onclick="toggleProfileMenu()">👤</button>
          <div class="profile-dropdown" id="profileDropdown">
              <ul>
                  <li><a>Profile</a></li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
              </ul>
          </div>
      </div>
  </header>
    <div id="viewContainer"></div>
    <footer class="footer">
      All rights reserved © Language Study App
  </footer>
    `;
    // <button id="switchViewBtn">Switch to Simple View</button>
  }

  // Attaches the necessary event listeners
  #attachEventListeners() {
    // TODO whoever is making multiui view: add multiple buttons and then add listeners to publish the corresponding events

    // Subscribe to redirection events to switch the current view in multi-view-ui
    this.#hub.subscribe(Events.RedirectToHomepage, () => {
      this.#currentView = "main";
      this.#renderCurrentView();
    });

    this.#hub.subscribe(Events.RedirectToExercise, () => {
      this.#currentView = "exercise";
      this.#renderCurrentView();
    });

    this.#hub.subscribe(Events.RedirectToTranslation, () => {
      this.#currentView = "translation";
      this.#renderCurrentView();
    });

    // Add events listeners to publish redirection events
    const logo = this.#container.querySelector(".logo");
    logo.addEventListener("click", () => {
      this.#hub.publish(Events.RedirectToHomepage);
    });

    const flashcard = this.#container.querySelector("#flashcard");
    flashcard.addEventListener("click", () => {
      this.#hub.publish(Events.RedirectToFlashcard);
    });

    const exercise = this.#container.querySelector("#exercise");
    exercise.addEventListener("click", () => {
      this.#hub.publish(Events.RedirectToExercise);
    });

    const translate = this.#container.querySelector("#translate");
    translate.addEventListener("click", () => {
      this.#hub.publish(Events.RedirectToTranslation);
    });

    const about = this.#container.querySelector("#about");
    about.addEventListener("click", () => {
      this.#hub.publish(Events.RedirectToAbout);
    });

    const contact = this.#container.querySelector("#contact");
    contact.addEventListener("click", () => {
      this.#hub.publish(Events.RedirectToContact);
    });

    // Profile Menu Functionality
    const profileButton = this.#container.querySelector(".profile-button");
    const profileDropdown = this.#container.querySelector("#profileDropdown");

    // Toggle profile menu when the button is clicked
    profileButton.addEventListener("click", () => {
      this.#hub.publish(Events.ToggleProfileMenu);
    });

    // Subscribe to 'ToggleProfileMenu' and toggle visibility of profile dropdown
    this.#hub.subscribe(Events.ToggleProfileMenu, () => {
      profileDropdown.style.display =
        profileDropdown.style.display === "block" ? "none" : "block";
    });

    // Close the profile menu when clicking outside of it
    window.addEventListener("click", (event) => {
      if (
        !profileDropdown.contains(event.target) &&
        event.target !== profileButton
      ) {
        this.#hub.publish(Events.CloseProfileMenu);
      }
    });

    // Subscribe to 'CloseProfileMenu' to hide the dropdown
    this.#hub.subscribe(Events.CloseProfileMenu, () => {
      profileDropdown.style.display = "none";
    });

    // Language Selection Functionality
    const languageSelection = this.#container.querySelector("#language-select");
    const languageOptions =
      this.#container.querySelectorAll(".language-option");

    // Update selected language when a language option is clicked
    languageOptions.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        this.#hub.publish(Events.LanguageChanged, {
          selectedLanguage: option.getAttribute("data-language"),
        });
      });
    });

    // Subscribe to 'LanguageChanged' and update the language selection text
    this.#hub.subscribe(Events.LanguageChanged, (data) => {
      languageSelection.textContent = data.selectedLanguage;
    });
  }

  // Renders the current view based on the #currentView state
  #renderCurrentView() {
    const viewContainer = this.#container.querySelector("#viewContainer");
    viewContainer.innerHTML = ""; // Clear existing content

    setTimeout(() => {
      switch (this.#currentView) {
        case "main":
          viewContainer.appendChild(this.#landingPageComponent.render());
          break;
        case "exercise":
          viewContainer.appendChild(this.#exercisePageComponent.render());
          break;
        case "translate":
          viewContainer.appendChild(this.#translationPageComponent.render());
        default:
          throw Error("Invalid View");
      }
    }, 50);
  }
}
