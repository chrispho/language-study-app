import express from "express";
import TranslationController from "../controllers/translationController.js"

class TranslationRoutes{
  constructor() {
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes(){
    /*
    POST /translate
    translates input in the format
    {
      inLang: input lang code
      outLang: output lang code
      text: text to translate
    }
    see https://cloud.google.com/translate/docs/languages for codes

    Response types
    200
    {
      translated: translated text
    }
    500
    {
      error: error details
    }
    */
    this.router.post("/translate", async (req, res) => {
      console.log("POST /translate")
      await TranslationController.translate(req, res)
    })


    /*
    GET /translate-history
    gets the translation history for all users

    Response types
    200
    [
      {
      inLang: input lang code
      outLang: output lang code
      input: input text for translation
      output: output text
     },
     {
      same thing as entry 1
     }
    ]
    The responses will be in chronological ascending order.
    */
    this.router.get("/translate-history", async (req, res) => {
      console.log("GET /translate-history")
      await TranslationController.getHistory(req, res);
    })
  }

  getRouter(){
    return this.router
  }
}

export default new TranslationRoutes().getRouter();