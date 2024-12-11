import { TranslationService } from "./translationService.js";
import { TranslationHistoryService } from "./translationHistoryService.js";

export class TranslationFactory {
  constructor(){
    throw new Error("this is a factory")
  }

  static get(){
    return new TranslationService();
  }
  static getHistory(){
    return new TranslationHistoryService();
  }
}