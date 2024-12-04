import { Service } from "./service.js";
import { Events } from "../eventhub/Events.js";

export class TranslationService extends Service {
  constructor() {
    super();
  }

  async translate(data) {
    // const input = inputElem.value;
    // const inputLang = inputLangElem.value;
    // const outputLang = outputLangElem.value;

    const translatedResp = await fetch("/v1/translate", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        "Content-Type": "application/json"
      }
    });

    const translatedObj = await translatedResp.json();

    // outputElem.value = translatedObj.translated;
    if(translatedResp.ok){
      this.publish(Events.TranslateSuccess, translatedObj);
    }else{
      this.publish(Events.TranslateFailure, translatedObj);
    }
  }

  addSubscriptions() {
    this.subscribe(Events.Translate, (data) => {
      this.translate(data)
    });
  }
}
