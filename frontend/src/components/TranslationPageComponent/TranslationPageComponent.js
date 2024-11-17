import { Component } from "../Component/Component.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class TranslationPageComponent extends Component {
  #container = null; // Private variable to store the container element

  #inputLangElem = null;
  #inputElem = null;
  #outputLangElem = null;
  #outputElem = null;
  #translateButton = null;
  #toFlashcardButton = null;

  constructor() {
    super();
    this.loadCSS("TranslationPageComponent");
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
    this.#container.classList.add("translation-view");
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <div class="container">
    <h1>TRANSLATOR</h1>
    <form>
      <div class="translationSection">
        <div class="inputSide">
          <label for="input_lang">Input language</label>
          <select id="input_lang">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
          <label for="input">Input</label>
          <textarea type="text" id="input"></textarea>
        </div>
        <div class="arrow">></div>
        <br />
        <div class="outputSide">
          <label for="output_lang">Output language</label>
          <select id="output_lang">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
          <label for="output">Translated</label>
          <textarea type="text" id="output" readonly="readonly"></textarea>
        </div>
      </div>
      <div class="translateButton">
        <input
          type="button"
          class="submit-btn"
          id="translate"
          value="TRANSLATE"
        />
        <input
          type="button"
          class="flashcard-btn"
          id="to_flashcard"
          value="CREATE FLASHCARD"
        />
      </div>
    </form>
  </div>
    `; // TODO add inputs here
  }

  translate() {
    const input = this.#inputElem.value;
    const inputLang = this.#inputLangElem.value;
    const outputLang = this.#outputLangElem.value;

    EventHub.getInstance().publish(Events.Translate, {
      inLang: inputLang,
      outLang: outputLang,
      text: input,
    });
  }

  toFlashcard() {
    const input = this.#inputElem.value;
    const inputLang = this.#inputLangElem.value;
    const output = this.#outputElem.value;
    const outputLang = this.#outputLangElem.value;

    EventHub.getInstance().publish(Events.RedirectToFlashcard, {
      input: input,
      inputLang: inputLang,
      output: output,
      outputLang: outputLang,
    });
  }

  // Attaches the event listeners to the component
  #attachEventListeners() {
    this.#inputLangElem = this.#container.querySelector("#input_lang");
    this.#inputElem = this.#container.querySelector("#input");
    this.#outputLangElem = this.#container.querySelector("#output_lang");
    this.#outputElem = this.#container.querySelector("#output");
    this.#translateButton = this.#container.querySelector("#translate");
    this.#toFlashcardButton = this.#container.querySelector("#to_flashcard");

    this.#translateButton.addEventListener("click", () => this.translate());

    this.#toFlashcardButton.addEventListener("click", () => this.toFlashcard());

    EventHub.getInstance().subscribe(
      Events.TranslateSuccess,
      (translatedObj) => (this.#outputElem.value = translatedObj.translated)
    );

    EventHub.getInstance().subscribe(
      Events.TranslateFailure,
      (failure) => (this.#outputElem.value = failure)
    );

    // for switching from flashcards page
    EventHub.getInstance().subscribe(Events.RedirectToTranslation, (data) => {
      if (data === undefined) return;
      this.#inputElem.value = data.input;
      if (data.inputLang !== undefined)
        this.#inputLangElem.value = data.inputLang;
      this.#outputElem.value = data.translated;
      if (data.outputLang !== undefined)
        this.#outputLangElem.value = data.inputLang;
    });
  }
}
