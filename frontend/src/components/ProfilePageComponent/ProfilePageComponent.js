// Importing necessary modules and dependencies
import { Component } from "../Component/Component.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

// ProfilePageComponent extends the base Component class
export class ProfilePageComponent extends Component {
  #container = null;
  #hub = null;

  constructor() {
    super();
    this.#hub = EventHub.getInstance();
    this.loadCSS("ProfilePageCoMponent");
  }

  // Render method to create and return the component's DOM structure
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    // Request user profile data when rendering
    this.#hub.publish(Events.LoadUserProfile);

    return this.#container;
  }

  // Private method to create the main container div
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("profile-page");
  }

  // Private method to set up the initial HTML content of the container
  #setupContainerContent() {
    // Initially, leave placeholders or empty data.
    // We'll fill them when UserProfileSuccess is received.
    this.#container.innerHTML = `
      <header class="profile-header">
        <div class="profile-info">
          <img src="/images/avatar1.png" alt="User Avatar" class="avatar">
          <div>
            <h1 class="username">Loading...</h1>
            <p class="bio">Fetching user data...</p>
            <p class="joined-date"></p>
          </div>
        </div>
      </header>
      <main>
        <nav class="tabs">
          <button class="tab active" data-tab="progress">Progress</button>
          <button class="tab" data-tab="achievements">Achievements</button>
          <button class="tab" data-tab="flashcards">Flashcards</button>
          <button class="tab" data-tab="exercises">Exercises</button>
        </nav>
        <section id="progress" class="tab-content active">
          <h2>User Progress Overview</h2>
          <div class="progress-summary"></div>
          <div class="progress-bars"></div>
        </section>
        <section id="achievements" class="tab-content">
          <h2>Trophies & Achievements</h2>
          <div class="achievements-grid"></div>
        </section>
        <section id="flashcards" class="tab-content">
          <h2>Saved Flashcards</h2>
          <div class="flashcards-container"></div>
        </section>
        <section id="exercises" class="tab-content">
          <h2>Completed Exercises</h2>
          <ul class="exercise-list"></ul>
        </section>
      </main>
      <footer>
        <p>© 2024 Learn&Grow</p>
      </footer>
    `;
  }

  // Private method to attach event listeners for tabs and handle profile data events
  #attachEventListeners() {
    const tabs = this.#container.querySelectorAll(".tab");
    const tabContents = this.#container.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.dataset.tab;
        tabContents.forEach((content) => {
          content.classList.toggle("active", content.id === target);
        });
      });
    });

    // Subscribe to UserProfileSuccess and UserProfileFailure
    this.#hub.subscribe(Events.UserProfileSuccess, (data) => {
      this.#updateProfilePage(data);
    });

    this.#hub.subscribe(Events.UserProfileFailure, (error) => {
      console.error("Failed to load user profile:", error);
      const usernameElem = this.#container.querySelector(".username");
      usernameElem.textContent = "Error loading profile";
      const bioElem = this.#container.querySelector(".bio");
      bioElem.textContent = error;
    });
  }

  // Private method to update the profile page with fetched user data
  #updateProfilePage(data) {
    // Extract user response object
    const userResp = data.user;        // { success: true, data: { ...user fields... } }
    const userObj = userResp.data;     // The actual user object with all fields
  
    // Extract necessary fields from userObj
    const {
      username,
      userStreak,
      createdAt,
      achievements,
      exercisesCompleted,
      flashcardsSaved,
      languageProgress
    } = userObj;
  
    // Convert languageProgress object into an array of { language, progress }
    const progress = Object.keys(languageProgress).map(lang => ({
      language: lang,
      progress: languageProgress[lang]
    }));
  
    // Now we have the data we need directly from userObj
    const achievementsArr = achievements || [];
    const exercisesArr = exercisesCompleted || [];
    const flashcardsArr = flashcardsSaved || [];
  
    // Update User Info
    const usernameElem = this.#container.querySelector(".username");
    usernameElem.textContent = username;
  
    const bioElem = this.#container.querySelector(".bio");
    bioElem.textContent = `Lifelong learner | ${userStreak}-day streak`;
  
    const joinedDateElem = this.#container.querySelector(".joined-date");
    joinedDateElem.textContent = `Joined: ${new Date(createdAt).toLocaleDateString()}`;
  
    // Update Progress
    const progressSummaryElem = this.#container.querySelector(".progress-summary");
    const totalHours = 0; // If needed, add hours to user model or remove this line
    const overallProgress = progress.length > 0 
      ? Math.round(progress.reduce((sum, p) => sum + p.progress, 0) / progress.length) 
      : 0;
    progressSummaryElem.innerHTML = `
      <p>Overall Progress: <strong>${overallProgress}%</strong></p>
    `;
  
    const progressBarsContainer = this.#container.querySelector(".progress-bars");
    progressBarsContainer.innerHTML = "";
    progress.forEach((p) => {
      const barContainer = document.createElement("div");
      barContainer.classList.add("progress-bar");
      barContainer.setAttribute("data-progress", p.progress);
    
      const fillDiv = document.createElement("div");
      fillDiv.classList.add("fill");
      fillDiv.style.setProperty("--progress-width", `${p.progress}%`);
    
      barContainer.innerHTML = `
        <span>${p.language} - ${p.progress}%</span>
        <div class="bar"></div>
      `;
      
      barContainer.querySelector(".bar").appendChild(fillDiv);
      progressBarsContainer.appendChild(barContainer);
    });
  
    // Update Achievements
    const achievementsGrid = this.#container.querySelector(".achievements-grid");
    achievementsGrid.innerHTML = "";
    achievementsArr.forEach((a) => {
      const achievementElem = document.createElement("div");
      achievementElem.classList.add("achievement");
      achievementElem.innerHTML = `
        <img src="/images/trophy.png" alt="${a.name}">
        <p>${a.name}</p>
      `;
      achievementsGrid.appendChild(achievementElem);
    });
  
    // Update Flashcards
    const flashcardsContainer = this.#container.querySelector(".flashcards-container");
    flashcardsContainer.innerHTML = "";
    flashcardsArr.forEach((f) => {
      const flashcardElem = document.createElement("div");
      flashcardElem.classList.add("flashcard");
      flashcardElem.innerHTML = `
        <div class="front">${f.front}</div>
        <div class="back">${f.back}</div>
      `;
      flashcardsContainer.appendChild(flashcardElem);
    });
  
    // Update Exercises
    const exerciseList = this.#container.querySelector(".exercise-list");
    exerciseList.innerHTML = "";
    exercisesArr.forEach((e) => {
      const li = document.createElement("li");
      const dateStr = e.date ? new Date(e.date).toLocaleDateString() : "N/A";
      li.textContent = `${e.name} - ${e.score || 0}% (${dateStr})`;
      exerciseList.appendChild(li);
    });
  }
}
