import { Events } from "../../eventhub/Events.js";
import { Component } from "../Component/Component.js"
import { EventHub } from "../../eventhub/EventHub.js";

class flashcard{ //flashcard class
    constructor(engish, translation, lang, set){
        this.lang = lang;
        this.engish = engish;
        this.translation = translation;
        this.set = set;
    }

    getEnglish(){
        return this.engish;
    }

    getTranslation(){
        return this.translation;
    }

    // Check flashcard language matches set language?

    // 

}

class flashcardSet{ //flashcard set class
    constructor(name, lang, flashcards){
        this.lang = lang;
        this.name = name;
        this.flashcards = flashcards;
        this.length = flashcards.length;
        this.currflashcards = flashcards;
    }

    addCard(card){
        this.flashcards.unshift(card); //Add to begining of array, changing all other indexes and length
        this.length += 1;
    }

    getFlashcards(){
        return this.flashcards;
    }

    getCurrFlashcards(){
        return this.currflashcards;
    }

    getLength(){
        return this.length;
    }
}

// Dictionary holding all sets
const flashcardSets = {} // Going to need one for each language
const currLang = "spanish"
let currSet = NaN;
let currCardPos = 0;

export class FlashcardPageComponent extends Component {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data
  #hub = null;

  constructor() {
    super();
    this.loadCSS('FlashcardsPageComponent');
    this.#hub = EventHub.getInstance();

    this.getSets(); // Reload the sets we have
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
    this.#container.classList.add('flashcard-view');
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h1 id="currlang-display">Current Language:</h1>
    <h1 style="text-align: center; margin-top: calc(10vh + 20px);">FLASHCARD SETS</h1>
    
    <!-- View Set Div-->
    <div class="overlay" id="viewset" style="display: none;">
        <div id="viewset-content">
            <h2 id="set-name">Flashcard Set</h2>
            <div id="currcard-container">
                <button class="view-set-button card-shift" id="prev-card">&lt;</button>
                <button class="setbox" id="currcard">
                    <h3 id="currcard-english" >Text Here</h3>
                </button>
                <button class="view-set-button card-shift" id="next-card">&gt;</button>
            </div>
            <button class="view-set-button" id="shuffle-set">Shuffle</button>
            <br>
            <button class="view-set-button add-button" id="add-card">Add Flashcard</button>
            <button class="view-set-button cancel-button" id="close-set">Close Set</button>
        </div>
    </div>

    <!-- Add Flashcard Div-->
    <div class = "overlay" id="addflashcard" style="display: none;">
        <div id="addflashcard-content">
            <button class="setbox" id="new-english">
                <form>
                    <label for="add-english">English</label>
                    <br>
                    <input type="text" class="add-setbox-text" id="add-english">
                </form>
            </button>
            <button class="setbox" id="new-translation">
                <form>
                    <label for="add-translation">Translation</label>
                    <br>
                    <input type="text" class="add-setbox-text" id="add-translation">
                </form>
            </button>
            <br>
            <button class="view-set-button cancel-button" id="cancel-add-flashcard">Cancel</button>
            <button class="view-set-button add-button" id="finish-add-flashcard">Add</button>
        </div>
    </div>

    <!-- Add Set Div-->
    <div class="overlay" id="addset" style="display: none;">
        <div id="addset-content">
            <h2>Add Set</h2>
            <form>
                <label for="set-add-name">Set Name:</label>
                <input type="text" id="set-add-name">
            </form>
            <br>
            <button class="addsetBtn" id="cancel-add">Cancel</button>
            <button class="addsetBtn" id="finish-add">Add Set</button>
        </div>
    </div>

    <!-- Sets -->
    <div id = "sets" >
        <button class="setbox" id="addbox">
            <h3 id="addbox_title">ADD SET</h3>
        </button>
    </div>
    <script src="flashcard.js"></script>

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

    this.#hub.subscribe( //Only need success, if failed it doesnt load!
        Events.FlashcardsSuccess,
        (flashcardsObj) => {
            flashcardSets = JSON.parse(flashcardsObj)
            const currDict = flashcardSets[currLang]; //Get current language dictionary
            for(key in Object.keys(currDict)){ //Make set div for all sets in langauge. Flashcards will auto be made when pressed on each set I beleive
                this.makeSetDiv(key);
            }
        } //Comes out as json file
    );

    const backToMainViewBtn = this.#container.querySelector('#backToMainViewBtn');

    const hub = EventHub.getInstance();
    // hub.subscribe(Events.NewTask, (taskData) => {
    //   this.#tasks.push(taskData);      
    //   this.#renderTasks();
    // });

    // hub.subscribe(Events.UnStoreTasks, () => {
    //   this.#tasks = [];
    //   this.#renderTasks();
    // });

    const currlangDisplay = this.#container.querySelector("#currlang-display")
    currlangDisplay.textContent = "Current Language: "+currLang;

    // Toggle set stuff:

    const setBoxes = this.#container.querySelectorAll('#setbox');
    const viewset = this.#container.querySelector('#viewset');
    const closeSetBtn = this.#container.querySelector('#close-set');

    // Close overlay when the close button is clicked
    closeSetBtn.addEventListener('click', () => {
        viewset.style.display = 'none';
    });

    // Add set stuff:

    const addBox = this.#container.querySelector("#addbox");
    const addset = this.#container.querySelector("#addset");
    addBox.addEventListener('click', () => {
        addset.style.display = 'flex';
    })

    const closeAddSetBtn = this.#container.querySelector("#cancel-add");
    closeAddSetBtn.addEventListener('click', () => {
        addset.style.display = 'none';
        this.#container.querySelector('#set-add-name').value = '';
    })

    const addSetBtn = this.#container.querySelector("#finish-add");
    const addSetName = this.#container.querySelector("#set-add-name");

    // Add set and behavior for each set loading once buton pressed
    addSetBtn.addEventListener('click', () => {
        const setName = addSetName.value
        if(setName.length == 0){
            alert("Need a name for the new set");
        }
        else if(Object.keys(flashcardSets).includes(setName)){
            alert("Name must be different from another set")
        }
        else{
            const newSet = new flashcardSet(setName,currLang,[]);
            flashcardSets[setName] = newSet;

            this.makeSetDiv(setName); //Make set

            // const domSet = document.createElement("button");
            // domSet.setAttribute("class","setbox");
            // domSet.setAttribute("id",setName+"-set");
            // domSet.setAttribute("data-set-name",setName);

            // // Viewset :
            // domSet.addEventListener('click', () => {
            //     viewset.style.display = 'flex';
            //     const setName = domSet.getAttribute("data-set-name");
            //     currSet = setName;
            //     this.#container.querySelector("#set-name").textContent = setName;

            //     const currcard = this.#container.querySelector("#currcard")
            //     currcard.replaceWith(currcard.cloneNode(true)); // Remove event listeners by replacing the node when we first open the set!
            //     currCardPos = 0; //Go to front of array;
            //     newSet.currflashcards = newSet.getFlashcards(); //Reset current flashcards to be normal order
            //     this.updateCards();
            // });

            // const title = document.createElement("h3");
            // title.textContent = setName;
            // domSet.appendChild(title);

            // const sets = this.#container.querySelector("#sets");
            // sets.insertBefore(domSet, sets.firstChild);

            this.#container.querySelector('#set-add-name').value = '';
            addset.style.display = 'none';
        }
    })

    //
    const addFlashcard = this.#container.querySelector("#add-card");
    const addflashcarddiv = this.#container.querySelector("#addflashcard");
    addFlashcard.addEventListener('click', () => {
        addflashcarddiv.style.display = 'flex';
    })

    const englishBox = this.#container.querySelector("#add-english"); //get element in div to add card
    const translationBox = this.#container.querySelector("#add-translation"); //get element in div to add card

    // Cancel new flashcard creation:
    const cancelNewFlashcard = this.#container.querySelector("#cancel-add-flashcard");
    cancelNewFlashcard.addEventListener('click', () => {
        addflashcarddiv.style.display = 'none';
        englishBox.value = '';
        translationBox.value = '';
    })

    // Add flashcard, update set and view of set
    const finishFlashcard = this.#container.querySelector("#finish-add-flashcard");
    finishFlashcard.addEventListener('click',() => {
        const newCard = new flashcard(englishBox.value, translationBox.value, currLang, currSet);

        const set = flashcardSets[currSet]; // get set from dictionary
        set.addCard(newCard); //add new card to set array of flashcards
        if(currCardPos != 0){
            currCardPos +=1 ;
        } // shift current index to the right since we added a card to the begining

        this.updateCards();
        addflashcarddiv.style.display = 'none'; //Close overlay for adding
        englishBox.value = '';
        translationBox.value = '';
    })

    // Shuffling current set in viewset
    const shufflesetBtn = this.#container.querySelector("#shuffle-set");
    shufflesetBtn.addEventListener('click', () => {
        const set = flashcardSets[currSet]; // Get set by currset
        const cardsInSet = set.getCurrFlashcards();
        shuffleArray(cardsInSet); //Shuffle it
        set.currflashcards = cardsInSet; // Change current flashcards to reflect
        currCardPos = 0; //Go to begining of shuffled set
        this.updateCards(); // Call to change view of cards in set
    })

    // Going to next card in set
    const nextCardBtn = this.#container.querySelector("#next-card");
    nextCardBtn.addEventListener('click', () => {
        const set = flashcardSets[currSet];
        if(currCardPos < set.getLength()-1){
            currCardPos += 1;
        }
        else{ //Loop to begining
            //alert("Returning to begining of set");
            currCardPos = 0;
        }
        this.updateCards();
    })

    const prevCardBtn = this.#container.querySelector("#prev-card");
    prevCardBtn.addEventListener('click', () => {
        const set = flashcardSets[currSet];
        if(currCardPos > 0){
            currCardPos -= 1;
        }
        else{
            //alert("Looping to end of set");
            currCardPos = set.getLength()-1;
        }
        this.updateCards();
    })

  }

  makeSetDiv(setName){
    const newSet = flashcardSets[setName];

    const domSet = document.createElement("button");
    domSet.setAttribute("class","setbox");
    domSet.setAttribute("id",setName+"-set");
    domSet.setAttribute("data-set-name",setName);

    // Viewset :
    domSet.addEventListener('click', () => {
        viewset.style.display = 'flex';
        const setName = domSet.getAttribute("data-set-name");
        currSet = setName;
        this.#container.querySelector("#set-name").textContent = setName;

        const currcard = this.#container.querySelector("#currcard")
        currcard.replaceWith(currcard.cloneNode(true)); // Remove event listeners by replacing the node when we first open the set!
        currCardPos = 0; //Go to front of array;
        newSet.currflashcards = newSet.getFlashcards(); //Reset current flashcards to be normal order
        this.updateCards();
    });

    const title = document.createElement("h3");
    title.textContent = setName;
    domSet.appendChild(title);

    const sets = this.#container.querySelector("#sets");
    sets.insertBefore(domSet, sets.firstChild);

    console.log(flashcardSets)
  }

  updateCards(){
    // Need to set curr card element to show the top of array of this set, if set is empty then put placeholder
    this.storeSets(); // Store current sets after this additon

    const currCard = this.#container.querySelector("#currcard");
    const currCardText = this.#container.querySelector("#currcard-english");
    
    const setName = currSet;
    const set = flashcardSets[setName]
    const cardsInSet = set.getCurrFlashcards();

    if(set.getLength() == 0){
        currCardText.textContent = "No Cards in Set"
    }
    // Behavior for current flashcard in viewset
    else{
        const topCardInSet = cardsInSet[currCardPos];
        currCardText.textContent = topCardInSet.getEnglish();
        // Problem: I am giving a click event to curr card already before, it s not ging to this if statement but has the click event already on it.
        currCard.addEventListener('click', () => {
            currCardText.textContent = topCardInSet.getTranslation();
        })
    }
}

  getSets(){ //Request new flashcards
    this.#hub.publish(Events.GetFlashcards);
  }

  storeSets(){ //Publish storing when needed. Will change server
    this.#hub.publish(Events.StoreFlashcards, {data: flashcardSets});
  }

    async #updateSets(){

    const translatedResp = await fetch("/v1/flashcards", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    });

    const data = await translatedResp.json();

    const userResp = data.user;        // { success: true, data: { ...user fields... } }
    const userObj = userResp.data;     // The actual user object with all fields
  
    // Extract necessary fields from userObj
    const {
      flashcardsSaved,
    } = userObj;

    const flashcardsArr = flashcardsSaved || [];


    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

