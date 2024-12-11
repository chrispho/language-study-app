import { Component } from "../Component/Component.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { Events } from "../../eventhub/Events.js";

export class TranslationPageComponent extends Component {
  #container = null; // Private variable to store the container element
  #hub = null;
  #statusBar = null;
  #historyDiv = null;

  #inputLangElem = null;
  #inputElem = null;
  #outputLangElem = null;
  #outputElem = null;
  #translateButton = null;
  #toFlashcardButton = null;

  #codeToLang = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
  }

  constructor() {
    super();
    this.#hub = EventHub.getInstance()
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
    this.#createStatusBar();
    // this.#populateHistoryEntries(
    //   [{inLang: "en",
    //   outLang: "ko",
    //   input: "input",
    //   output: "output"
    // }]
    // );

    this.#hub.publish(Events.LoadTranslateHistory)

    return this.#container;
  }

  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("translation-view");
  }

  #createStatusBar(){
    this.#statusBar = document.createElement("div");
    this.#statusBar.classList.add("translation-status-bar")
    this.#container.appendChild(this.#statusBar);
  }

  #createHistoryEntry(inLang, outLang, input, output) {
    const histEntry = document.createElement("div")
    histEntry.classList.add("hist-entry")
    histEntry.addEventListener("click", () => {
      this.#inputElem.value = input
      this.#inputLangElem.value = inLang
      this.#outputElem.value = output
      this.#outputLangElem.value = outLang
    })
    histEntry.innerText=`${this.#codeToLang[inLang]}: ${input} => ${this.#codeToLang[outLang]}: ${output}`
    return histEntry
  }

  #populateHistoryEntries(data){
    this.#historyDiv = this.#container.querySelector("#history");

    data.forEach(entry => {
      this.#historyDiv.prepend(this.#createHistoryEntry(entry.inLang, entry.outLang, entry.input, entry.output))
    });
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
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
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
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
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
      </div>
    </form>
    <h2>History</h2>
    <div id="history">
    </div>
  </div>
    `;
  }

  translate() {
    const input = this.#inputElem.value;
    const inputLang = this.#inputLangElem.value;
    const outputLang = this.#outputLangElem.value;

    this.#hub.publish(Events.Translate, {
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

    this.#hub.publish(Events.RedirectToFlashcard, {
      input: input,
      inputLang: inputLang,
      output: output,
      outputLang: outputLang,
    });
  }

  showStatus(text, color, time){
    this.#statusBar.innerHTML = text;
    this.#statusBar.style.background = color;
    this.#statusBar.classList.add("translation-status-slide-in")
    setTimeout(() => {this.#statusBar.classList.remove("translation-status-slide-in")}, time);
  }

  // Attaches the event listeners to the component
  #attachEventListeners() {
    this.#inputLangElem = this.#container.querySelector("#input_lang");
    this.#inputElem = this.#container.querySelector("#input");
    this.#outputLangElem = this.#container.querySelector("#output_lang");
    this.#outputElem = this.#container.querySelector("#output");
    this.#translateButton = this.#container.querySelector("#translate");

    this.#translateButton.addEventListener("click", () => this.translate());

    this.#hub.subscribe(
      Events.TranslateSuccess,
      (translatedObj) => {(this.#outputElem.value = translatedObj.output); this.showStatus("Success!", "green", 1000); 
        this.#historyDiv.prepend(this.#createHistoryEntry(translatedObj.inLang, translatedObj.outLang, translatedObj.input, translatedObj.output))
      }
    );

    this.#hub.subscribe(
      Events.TranslateFailure,
      (failure) => {this.showStatus("ERROR: " + failure.error, "red", 3000)}
    );

    this.#hub.subscribe(
      Events.TranslateHistorySuccess, (data) => {
        this.#populateHistoryEntries(data)
      }
    )

    this.#hub.subscribe(
      Events.TranslateHistoryFail,
      (failure) => {this.showStatus("ERROR IN GETTING HISTORY: " + failure.error, "red", 3000)}
    );

    // for switching from flashcards page
    this.#hub.subscribe(Events.RedirectToTranslation, (data) => {
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
