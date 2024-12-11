import { Service } from "./service.js";
import { Events } from "../eventhub/Events.js";

const USER_ID = "b87358c2-c782-4b81-ad2e-4b2290d014c4";

export class FlashcardsService extends Service {
    constructor() {
      super();
    }
  
    async storeFlashcards(data) {
      // const input = inputElem.value;
      // const inputLang = inputLangElem.value;
      // const outputLang = outputLangElem.value;
      try{
        const response = await fetch(`/v1/flashcards/${USER_ID}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers:{
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          // Explicitly handle HTTP errors
          localStorage.setItem(`flashcards_${USER_ID}`, JSON.stringify(data)); //For protection lets store it
          throw new Error(
            `HTTP error! status: ${response.status}, statusText: ${response.statusText}`
          );
        }
      } catch(error){
        console.error("Error storing flashcards:", error);
      }
    }

    async getFlashcards(){
      try{
        const flashcardResp = await fetch(`/v1/flashcards/${USER_ID}`);

        let flashcards;
        if (!flashcardResp.ok) {
          flashcards = localStorage.getItem(`flashcards_${USER_ID}`); //For protection lets store it
          this.publish(Events.FlashcardsSuccess, flashcards); //Give data to event hub
          throw new Error(`Error fetching flashcards: ${flashcardResp.status} ${flashcardResp.statusText}`);
        }

        flashcards = await flashcardResp.json();

        this.publish(Events.FlashcardsSuccess, flashcards); //Give data to event hub
      } catch(error){
        console.error("Error fetching flashcards:", error);
      }
    }
  
    addSubscriptions() {
      this.subscribe(Events.GetFlashcards, () => {
        this.getFlashcards();
      });
      this.subscribe(Events.StoreFlashcards, (data) => {
        this.storeFlashcards(data.data);
      });
    }
  }