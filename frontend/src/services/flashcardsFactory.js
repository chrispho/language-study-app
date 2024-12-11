import { FlashcardsService } from "./flashcardsService.js";

export class FlashcardsFactory {
  constructor(){
    throw new Error("this is a factory")
  }

  static get(){
    return new FlashcardsService();
  }
}