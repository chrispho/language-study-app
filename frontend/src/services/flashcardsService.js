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
        await fetch(`/v1/flashcards/${USER_ID}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers:{
            "Content-Type": "application/json"
          }
        });
      } catch(error){
        console.error("Error fetching flashcards:", error);
      }
    }

    async getFlashcards(){
      try{
        const flashcardResp = await fetch(`/v1/flashcards/${USER_ID}`);
        if (!flashcardResp.ok) {
          throw new Error(`Error fetching flashcards: ${flashcardResp.status} ${flashcardResp.statusText}`);
        }
        const flashcards = await flashcardResp.json();

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
        this.storeFlashcards(data);
      });
    }
  }