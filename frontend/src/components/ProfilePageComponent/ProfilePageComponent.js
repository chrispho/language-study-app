import { Component } from "../Component/Component.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class ProfilePageComponent extends Component {
  #container = null;
  #hub = null;

  constructor() {
    super();
    this.#hub = EventHub.getInstance();
    this.loadCSS("ProfilePageCoMponent"); // Ensure CSS is dynamically loaded
  }

  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    return this.#container;
  }

  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("profile-page");
  }

  #setupContainerContent() {
    this.#container.innerHTML = `
      <header class="profile-header">
    <div class="profile-info">
      <img src="/frontend/public/images/avatar1.png" alt="User Avatar" class="avatar">
      <div>
        <h1 class="username">John Doe</h1>
        <p class="bio">Lifelong learner | Polyglot | 200-day streak</p>
        <p class="joined-date">Joined: Jan 2023</p>
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
      <div class="progress-summary">
        <p>Total Hours Studied: <strong>150 hrs</strong></p>
        <p>Overall Progress: <strong>75%</strong></p>
      </div>
      <div class="progress-bars">
        <div class="progress-bar">
          <span>Spanish - 80%</span>
          <div class="bar"><div class="fill" style="width: 80%;"></div></div>
        </div>
        <div class="progress-bar">
          <span>French - 60%</span>
          <div class="bar"><div class="fill" style="width: 60%;"></div></div>
        </div>
        <div class="progress-bar">
          <span>Japanese - 50%</span>
          <div class="bar"><div class="fill" style="width: 50%;"></div></div>
        </div>
      </div>
    </section>

    <section id="achievements" class="tab-content">
      <h2>Trophies & Achievements</h2>
      <div class="achievements-grid">
        <div class="achievement">
          <img src="/frontend/public/images/100-day.png" alt="Streak Badge">
          <p>100-Day Streak</p>
        </div>
        <div class="achievement">
          <img src="/frontend/public/images/level-5.png" alt="Level Completion">
          <p>Completed Level 5 (Spanish)</p>
        </div>
        <div class="achievement">
          <img src="/frontend/public/images/500-word.png" alt="Challenge">
          <p>Mastered 500 Words</p>
        </div>
      </div>
    </section>

    <section id="flashcards" class="tab-content">
      <h2>Saved Flashcards</h2>
      <div class="flashcards-container">
        <div class="flashcard">
          <div class="front">Hola</div>
          <div class="back">Hello (Spanish)</div>
        </div>
        <div class="flashcard">
          <div class="front">Bonjour</div>
          <div class="back">Hello (French)</div>
        </div>
        <div class="flashcard">
          <div class="front">ありがとう</div>
          <div class="back">Thank you (Japanese)</div>
        </div>
      </div>
    </section>

    <section id="exercises" class="tab-content">
      <h2>Completed Exercises</h2>
      <ul class="exercise-list">
        <li>Spanish Quiz 1 - 95% (2024-11-10)</li>
        <li>French Practice 2 - 88% (2024-11-12)</li>
        <li>Japanese Kanji Drill - 70% (2024-11-13)</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>© 2024 Learn&Grow</p>
  </footer>
    `;
  }

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
  }
}
