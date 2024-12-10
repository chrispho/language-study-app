import { FlashcardsService } from "./flashcardsService.js";

export class FlashCardsFactory {
  constructor(){
    throw new Error("this is a factory")
  }

  static get(){
    return new FlashcardsService();
  }
}