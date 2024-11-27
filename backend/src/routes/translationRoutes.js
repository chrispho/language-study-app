import express from "express";
import TranslationController from "../controllers/translationController.js"

class TranslationRoutes{
  constructor() {
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes(){
    /*
    translates input
    POST? /translate
    response is { "TBD": "TBD" }
    200 or 500
    */
    this.router.post("/translate", async (req, res) => {
      console.log("POST /translate")
      await TranslationController.translate(req, res)
    })
  }

  getRouter(){
    return this.router
  }
}

export default new TranslationRoutes().getRouter();