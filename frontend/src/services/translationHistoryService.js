import { Service } from "./service.js";
import { Events } from "../eventhub/Events.js";

export class TranslationHistoryService extends Service {
  constructor() {
    super();
  }

  async getHistory() {
    const translationHistoryResp = await fetch("/v1/translate-history");

    const historyObj = await translationHistoryResp.json();

    if(translationHistoryResp.ok){
      this.publish(Events.TranslateHistorySuccess, historyObj);
    }else{
      this.publish(Events.TranslateHistoryFail, historyObj);
    }
  }

  addSubscriptions() {
    this.subscribe(Events.LoadTranslateHistory, () => {
      this.getHistory()
    });
  }
}
