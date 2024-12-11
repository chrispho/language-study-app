import { Component } from "../Component/Component.js";

export class ExercisePageComponent extends Component {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data

  constructor() {
    super();
    this.loadCSS("ExercisePageComponent");
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
    this.#container = document.createElement("div");
    this.#container.classList.add("exercise-view");
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("container");

    // Create the heading and paragraph
    const heading = document.createElement("h1");
    heading.textContent = "LET'S PRACTICE!";
    const exerciseType = document.createElement("p");
    exerciseType.classList.add("exercise-type");
    exerciseType.textContent = "Q1. Choose the correct option";

    // Create the question box
    const questionBox = document.createElement("div");
    questionBox.classList.add("question-box");

    // Helper function to format the Spanish time question
    function createQuestion(spanishTime) {
      const words = spanishTime.split(' ');
      const htmlWords = words.map(word => `<b><em><span class='word es-ES'>${word}</span></em></b>`).join(' ');
      return `Your friend tells you, ${htmlWords}. What time is it?`;
    }

    // Create the question and answer options
    const question = document.createElement("p");
    question.innerHTML = createQuestion("Son las siete y cinco");
    const answerOptions = document.createElement("div");

    // Create individual answer options
    const options = [
      { value: "5:17", correct: false },
      { value: "7:15", correct: false },
      { value: "5:07", correct: false },
      { value: "7:05", correct: true },
    ];

    // Create individual answer option buttons
    options.forEach((option) => {
      const optionBox = document.createElement("button");
      optionBox.classList.add("option-box");
      optionBox.classList.add(
        option.correct ? "correct-option" : "incorrect-option"
      );
      const optionText = document.createTextNode(option.value);

      optionBox.addEventListener("click", () => {
        // Remove the 'selected' class from all option boxes
        const optionBoxes = document.querySelectorAll(".option-box");
        optionBoxes.forEach((box) => box.classList.remove("selected"));

        // Add the 'selected' class to the clicked option box
        optionBox.classList.add("selected");
      });
      optionBox.appendChild(optionText);
      answerOptions.appendChild(optionBox);
    });

    // Create the submit button
    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-btn");
    submitButton.textContent = "SUBMIT";
    const submitButtonContainer = document.createElement("div");
    submitButtonContainer.appendChild(submitButton);

    // Append elements to the question box
    questionBox.appendChild(question);
    questionBox.appendChild(answerOptions);
    questionBox.appendChild(submitButtonContainer);

    // Create the feedback panel
    const feedbackPanel = document.createElement("div");
    feedbackPanel.classList.add("feedback-panel");

    // Create the definition pop-up
    const definition = document.createElement("div");
    definition.classList.add("definition-popup");
    definition.id = "definition";

    // Create the try again and next buttons
    const tryAgainButton = document.createElement("button");
    tryAgainButton.classList.add("try-again-btn");
    tryAgainButton.textContent = "TRY AGAIN";
    const nextButton = document.createElement("button");
    nextButton.classList.add("next-btn");
    nextButton.textContent = "NEXT";

    // Append buttons to the feedback panel
    feedbackPanel.appendChild(tryAgainButton);
    feedbackPanel.appendChild(nextButton);

    // Append all elements to the main container
    mainContainer.appendChild(heading);
    mainContainer.appendChild(exerciseType);
    mainContainer.appendChild(questionBox);
    mainContainer.appendChild(feedbackPanel);
    mainContainer.appendChild(definition);

    this.#container.appendChild(mainContainer);
  }

  // Attaches the event listeners to the component
  #attachEventListeners() {

    // Add event listeners to each word element:
    // - Mouseover: Show the definition in the popup
    // - Mouseleave: Hide the definition popup
    // - Click: Speak the word in the specified language
    this.#container.querySelectorAll(".word").forEach((wordElement) => {
      console.log(wordElement);
      wordElement.addEventListener("mouseover", function () {
        const popup = document.getElementById("definition");
        popup.textContent = getDefinition(wordElement.innerHTML);
        popup.style.display = "block";
      });

      wordElement.addEventListener("mouseleave", function () {
        document.getElementById("definition").style.display = "none";
      });

      wordElement.addEventListener("click", () => {
        speakPhrase(wordElement.innerHTML, wordElement.classList[1]);
      });
    });

    // Add event listener to the submit button:
    // - Show the feedback panel
    // - Mark all options as submitted
    const submitBtn = this.#container.getElementsByClassName("submit-btn");
    const feedbackPanel =
      this.#container.getElementsByClassName("feedback-panel");
    submitBtn[0].addEventListener("click", () => {
      feedbackPanel[0].classList.add("visible");
      const options = this.#container.getElementsByClassName("option-box");
      console.log(options);
      for (let i = 0; i < options.length; i++) {
        options[i].classList.add("submitted");
      }
    });

    // Add event listener to the try again button:
    // - Hide the feedback panel
    // - Remove 'submitted' and 'selected' classes from all options
    const tryAgain = this.#container.getElementsByClassName("try-again-btn");
    tryAgain[0].addEventListener("click", () => {
      feedbackPanel[0].classList.remove("visible");
      const options = this.#container.getElementsByClassName("option-box");
      for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("submitted");
        options[i].classList.remove("selected");
      }
    });
    
    // Add event listener to the next button (currently empty):
    // - Implement logic for handling the next exercise (e.g., fetch new data, update UI)
    const nextButton = this.#container.getElementsByClassName("next-btn");
    nextButton[0].addEventListener("click", () => {});
  }
}

function getDefinition(word) {
  return "Definition: " + "Backend not implemented.";
}

function speakPhrase(phrase, language) {
  // Create a new SpeechSynthesisUtterance object
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = language;
  speechSynthesis.speak(utterance);
}
