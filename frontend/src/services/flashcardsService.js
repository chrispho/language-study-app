export class FlashcardsService extends Service {
    constructor() {
      super();
    }
  
    async storeFlashcards(data) {
      // const input = inputElem.value;
      // const inputLang = inputLangElem.value;
      // const outputLang = outputLangElem.value;
  
      const flashcardResp = await fetch("/v1/flashcards", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
          "Content-Type": "application/json"
        }
      });
    }

    async getFlashcards(){
      try{
        const flashcardResp = await fetch(`/v1/flashcards`);
        if (!flashcardResp.ok) {
          throw new Error(`Error fetching user: ${userResp.status} ${userResp.statusText}`);
        }
        const flashcards = await flashcardResp.json();

        this.publish(Events.FlashcardsSuccess, flashcards); //Give data to event hub
      } catch(error){
        console.error("Error fetching flashcards:", error);
      }
    }
  
    addSubscriptions() {
      this.subscribe(Events.StoreFlashcards, (data) => {
        this.storeFlashcards(data);
      });
      this.subscribe(Events.GetFlashcards, () => {
        this.GetFlashcards();
      })
    }
  }