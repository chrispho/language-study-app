import { Events } from "../../eventhub/Events.js";
import { Component } from "../Component/Component.js"
import { EventHub } from "../../eventhub/EventHub.js";

// Dictionary holding all sets
let allFlashcards = {}
let currLang = "Spanish";
allFlashcards[currLang] = {};
let flashcardSets; // Going to need one for each language
let currSet = NaN;
let currCardPos = 0;

// Color changing functionality
let setColors = ["LightCoral", "LightSkyBlue", "MediumSpringGreen","MediumPurple","LightSalmon"];
let numColors = setColors.length;
let colorsIndex = 0;

//Deleting flashcard function
let deleting = false;

//Adding flashcard to specific set
let adding = false;
let addInfo = ["",""]; //First index is english, second is translation

class flashcard{ //flashcard class
    constructor(english, translation, lang, set){
        this.lang = lang;
        this.english = english;
        this.translation = translation;
        this.set = set;
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

        this.color = setColors[colorsIndex];
        if(++colorsIndex == numColors){
            colorsIndex = 0;
        }
        else{
            colorsIndex += 1;
        }
    }
}

export class FlashcardPageComponent extends Component {
  #container = null; // Private variable to store the container element
  #tasks = []; // To store task data
  #hub = null;

  constructor() {
    super();
    this.loadCSS('FlashcardsPageComponent');
    this.#hub = EventHub.getInstance();

  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();
    this.#attachEventListeners();

    //Changes langauge

    this.#hub.subscribe(Events.LanguageChanged, (data) => {

        const newLang = data.selectedLanguage;
        const currlangDisplay = this.#container.querySelector("#currlang-display")
        currlangDisplay.textContent = "Current Language: "+newLang;

        if(newLang != currLang){
            this.getSets(); //Update sets. This would, if language change, get new 
            currLang = newLang; //Change current language to get key from all flashcards
            if(!Object.keys(allFlashcards).includes(currLang)){ // If no dictonary for this then make empty
                allFlashcards[currLang] = {};
            }
            //flashcardSets = allFlashcards[currLang];

            // //Remove sets when changed
            // const setDivs = this.#container.querySelectorAll(".setbox")
            // const exceptions = ['addbox', 'currcard', 'new-translation','new-english']
            // setDivs.forEach(div => {
            //     if(!exceptions.includes(div.id)){
            //         div.remove();
            //     }
            // });

            // // Add new sets
            // const currDict = allFlashcards[currLang]; //Get current language dictionary
            // for(const key in Object.keys(currDict)){ //Make set div for all sets in langauge. Flashcards will auto be made when pressed on each set I beleive
            //     this.makeSetDiv(Object.keys(currDict)[key]);
            // }

            // if(Object.keys(allFlashcards[currLang]).length == 0){
            //     const deleteSetButton = this.#container.querySelector("#delete-set-btn");
            //     deleteSetButton.style.display = 'none';
            // }
        }
      });

    this.getSets();

    //Allow deleting after retreiving if needed
    if(Object.keys(allFlashcards[currLang]).length > 0){
        const deleteSetButton = this.#container.querySelector("#delete-set-btn");
        deleteSetButton.style.display = 'flex';
    }

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
    <h1 id="currlang-display">Current Language: Spanish</h1>
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
                <label for="add-english">English</label>
                <br>
                <textarea type="text" class="add-setbox-text" id="add-english"></textarea>
            </button>
            <button class="setbox" id="new-translation">
                <label for="add-translation">Translation</label>
                <br>
                <textarea type="text" class="add-setbox-text" id="add-translation"></textarea>
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

    <!-- Delete Set Div-->
    <div class="overlay" id="deleteset" style="display: none;">
        <div id="addset-content">
            <h2 id="are-you-sure-delete">Are you sure you want to delete set</h2>
            <br>
            <button class="view-set-button" id="confirm-delete-btn">Delete Set</button>
        </div>
    </div>

    <!-- Add to Set Div-->
    <div class="overlay" id="addtoset" style="display: none;">
        <div id="addset-content">
            <h2 id="are-you-sure-add">Are you sure you want to add to set</h2>
            <br>
            <button class="view-set-button" id="confirm-add-btn">Add to Set</button>
        </div>
    </div>

    <!-- Sets -->
    <div id = "sets" >
        <button class="setbox" id="addbox">
            <h3 id="addbox_title">ADD SET</h3>
        </button>
        <h2 id="adding" style="display: none;">Select a Set to Add the Flashcard to</h2>
        <h2 id="deleting" style="display: none;">Select a Set to Delete</h2>
        <button class="view-set-button" id="delete-set-btn" style="display: none;">
            <h3>DELETE A SET</h3>
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
            flashcardsObj = JSON.parse(flashcardsObj);
            if(Object.keys(flashcardsObj).includes(currLang)){
                allFlashcards = flashcardsObj
                const currDict = allFlashcards[currLang]; //Get current language dictionary

                //Remove sets when changed
                const setDivs = this.#container.querySelectorAll(".setbox")
                const exceptions = ['addbox', 'currcard', 'new-translation','new-english']
                setDivs.forEach(div => {
                    if(!exceptions.includes(div.id)){
                        div.remove();
                    }
                });

                // Add new sets:
                for(const key in Object.keys(currDict)){ //Make set div for all sets in langauge. Flashcards will auto be made when pressed on each set I beleive
                    this.makeSetDiv(Object.keys(currDict)[key]);
                }

                // Delete sets:
                if(Object.keys(currDict).length > 0){
                    const deleteSetButton = this.#container.querySelector("#delete-set-btn");
                    deleteSetButton.style.display = 'flex';
                }

                //If small then don't
                if(Object.keys(allFlashcards[currLang]).length == 0){
                    const deleteSetButton = this.#container.querySelector("#delete-set-btn");
                    deleteSetButton.style.display = 'none';
                }

            console.log(allFlashcards);
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

    // const currlangDisplay = this.#container.querySelector("#currlang-display")
    // currlangDisplay.textContent = "Current Language: "+currLang;

    // Toggle set stuff:

    const setBoxes = this.#container.querySelectorAll('#setbox');
    const viewset = this.#container.querySelector('#viewset');
    const closeSetBtn = this.#container.querySelector('#close-set');

    // Close overlay when the close button is clicked
    closeSetBtn.addEventListener('click', () => {
        // this.storeSets();
        // this.getSets();
        viewset.style.display = 'none';
    });

    //Delete set:
    const deleteSetButton = this.#container.querySelector("#delete-set-btn");
    deleteSetButton.addEventListener('click', () => {
        const deletingText = this.#container.querySelector("#deleting");
        deletingText.style.display = "flex";
        deleting = true;
    })

    // Adding flashcard to a seleted set:
    if(adding){
        const addingText = this.#container.querySelector("#adding");
        addingText.style.display = 'flex';
    }

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
        else if(Object.keys(allFlashcards[currLang]).includes(setName)){
            alert("Name must be different from another set")
        }
        else{
            const newSet = new flashcardSet(setName,currLang,[]);
            allFlashcards[currLang][setName] = newSet;
            this.storeSets(); //Store new set

            if(Object.keys(allFlashcards[currLang]).length > 0){
                deleteSetButton.style.display = 'flex';
            }

            this.makeSetDiv(setName);

            // const domSet = document.createElement("button");
            // domSet.setAttribute("class","setbox");
            // domSet.setAttribute("id",setName+"-set");
            // domSet.setAttribute("data-set-name",setName);
            // domSet.style.backgroundColor = newSet.color;

            // // Viewset :
            // domSet.addEventListener('click', () => {
            //     if(deleting){
            //         //Are you sure question
            //         const deleteSet = this.#container.querySelector("#deleteset");
            //         deleteSet.style.display = 'flex';

            //         const confirmText = this.#container.querySelector("#are-you-sure-delete");
            //         confirmText.innerText += " '"+setName+"'";

            //         const confirmDeleteButton = this.#container.querySelector("#confirm-delete-btn");
            //         confirmDeleteButton.addEventListener('click', () => {
            //             delete flashcardSets[setName];
            //             domSet.remove(); //Remove from html
            //             deleteSet.style.display = 'none';
            //             const deletingText = this.#container.querySelector("#deleting");
            //             deletingText.style.display = "none";
            //         })
            //         deleting = false;

            //     }
            //     else if(adding){
            //         // Functionality for adding flashcard to this set
            //         if(addInfo.length == 2){ //Make sure we have the info
            //             const addToSet = this.#container.querySelector("#addtoset");
            //             addToSet.style.display = 'flex';

            //             const confirmText = this.#container.querySelector("#are-you-sure-add");
            //             confirmText.innerText += " '"+setName+"'";

            //             const confirmAddButton = this.#container.querySelector("#confirm-add-btn");
            //             confirmAddButton.addEventListener('click', () => {
            //                 const newCard = new flashcard(addInfo[0], addInfo[1], currLang, setName);
            //                 const set = flashcardSets[setName]; // get set from dictionary
            //                 set.addCard(newCard); //add new card to set array of flashcards
            //                 addInfo = [];

            //                 addToSet.style.display = 'none';
            //             })
            //             const addingText = this.#container.querySelector("#adding");
            //             addingText.style.display = 'none';

            //             adding = false; //Reset adding info
            //         }
            //     }
            //     else{
            //         viewset.style.display = 'flex';
            //         const setName = domSet.getAttribute("data-set-name");
            //         currSet = setName;
            //         this.#container.querySelector("#set-name").textContent = setName;
    
            //         const currcard = this.#container.querySelector("#currcard")
            //         currcard.replaceWith(currcard.cloneNode(true)); // Remove event listeners by replacing the node when we first open the set!
            //         currCardPos = 0; //Go to front of array;
            //         newSet.currflashcards = newSet.getFlashcards(); //Reset current flashcards to be normal order
            //         this.updateCards();
            //     }
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

        const set = allFlashcards[currLang][currSet]; // get set from dictionary
        //set.addCard(newCard); //add new card to set array of flashcards
        set.flashcards.unshift(newCard);
        set.length += 1;
        this.storeSets();
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
        const set = allFlashcards[currLang][currSet]; // Get set by currset
        const cardsInSet = set.currflashcards;
        shuffleArray(cardsInSet); //Shuffle it
        set.currflashcards = cardsInSet; // Change current flashcards to reflect
        currCardPos = 0; //Go to begining of shuffled set
        this.updateCards(); // Call to change view of cards in set
    })

    // Going to next card in set
    const nextCardBtn = this.#container.querySelector("#next-card");
    nextCardBtn.addEventListener('click', () => {
        const set = allFlashcards[currLang][currSet];
        if(currCardPos < set.length-1){
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
        const set = allFlashcards[currLang][currSet];
        if(currCardPos > 0){
            currCardPos -= 1;
        }
        else{
            //alert("Looping to end of set");
            currCardPos = set.length-1;
        }
        this.updateCards();
    })

  }

  makeSetDiv(setName){
    const newSet = allFlashcards[currLang][setName];
    console.log(newSet);

    const domSet = document.createElement("button");
    domSet.setAttribute("class","setbox");
    domSet.setAttribute("id",setName+"-set");
    domSet.setAttribute("data-set-name",setName);
    domSet.style.backgroundColor = newSet.color;

    // Viewset :
    domSet.addEventListener('click', () => {
        if(deleting){
            //Are you sure question
            const deleteSet = this.#container.querySelector("#deleteset");
            deleteSet.style.display = 'flex';

            const confirmText = this.#container.querySelector("#are-you-sure-delete");
            confirmText.innerText = "Are you sure you want to delete set"+" '"+setName+"'";

            const confirmDeleteButton = this.#container.querySelector("#confirm-delete-btn");
            confirmDeleteButton.addEventListener('click', () => {
                delete allFlashcards[currLang][setName];
                domSet.remove(); //Remove from html
                deleteSet.style.display = 'none';
                const deletingText = this.#container.querySelector("#deleting");
                deletingText.style.display = "none";

                // Reset database
                this.storeSets();
                this.getSets();

                //Get rid of delete set option if only one left
                if(Object.keys(allFlashcards[currLang]).length == 0){
                    const deleteSetButton = this.#container.querySelector("#delete-set-btn");
                    deleteSetButton.style.display = 'none';
                }
            })
            deleting = false;
        }
        else if(adding){
            // Functionality for adding flashcard to this set
            if(addInfo.length == 2){ //Make sure we have the info
                const addToSet = this.#container.querySelector("#addtoset");
                addToSet.style.display = 'flex';

                const confirmText = this.#container.querySelector("#are-you-sure-add");
                confirmText.innerText = "Are you sure you want to add to set"+" '"+setName+"'";

                const confirmAddButton = this.#container.querySelector("#confirm-add-btn");
                confirmAddButton.addEventListener('click', () => {
                    const newCard = new flashcard(addInfo[0], addInfo[1], currLang, setName);
                    const set = allFlashcards[currLang][setName]; // get set from dictionary
                    set.flashcards.unshift(newCard); //add new card to set array of flashcards
                    set.length += 1;
                    addInfo = [];

                    addToSet.style.display = 'none';

                    this.storeSets();
                    this.getSets();
                })
                const addingText = this.#container.querySelector("#adding");
                addingText.style.display = 'none';

                adding = false; //Reset adding info
            }
        }
        else{ //View flashcard
            viewset.style.display = 'flex';
            const setName = domSet.getAttribute("data-set-name");
            currSet = setName;
            this.#container.querySelector("#set-name").textContent = setName;

            const currcard = this.#container.querySelector("#currcard")
            currcard.replaceWith(currcard.cloneNode(true)); // Remove event listeners by replacing the node when we first open the set!
            currCardPos = 0; //Go to front of array;
            newSet.currflashcards = newSet.flashcards; //Reset current flashcards to be normal order
            this.updateCards();
        }
    });

    const title = document.createElement("h3");
    title.textContent = setName;
    domSet.appendChild(title);

    const sets = this.#container.querySelector("#sets");
    sets.insertBefore(domSet, sets.firstChild);
  }

  updateCards(){
    // Need to set curr card element to show the top of array of this set, if set is empty then put placeholder
    //this.storeSets(); // Store current sets after this additon

    const currCard = this.#container.querySelector("#currcard");
    const currCardText = this.#container.querySelector("#currcard-english");
    
    const setName = currSet;
    const set = allFlashcards[currLang][setName]
    const cardsInSet = set.currflashcards;

    if(set.length == 0){
        currCardText.textContent = "No Cards in Set"
    }
    // Behavior for current flashcard in viewset
    else{
        const topCardInSet = cardsInSet[currCardPos];
        currCardText.textContent = topCardInSet.english;
        // Problem: I am giving a click event to curr card already before, it s not ging to this if statement but has the click event already on it.
        currCard.addEventListener('click', () => {
            currCardText.textContent = topCardInSet.translation;
        })
    }
}

  getSets(){ //Request new flashcards
    this.#hub.publish(Events.GetFlashcards);
  }

  storeSets(){ //Publish storing when needed. Will change server
    this.#hub.publish(Events.StoreFlashcards, {data: allFlashcards});
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

