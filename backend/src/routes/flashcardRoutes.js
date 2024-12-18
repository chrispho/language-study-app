import express from "express";
import FlashcardController from "../controllers/FlashcardController.js";

class FlashcardRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Store (Save) Entire Flashcards Dictionary
    this.router.post("/flashcards/:id", async (req, res) => {
      console.log(`POST /flashcards/${req.params.id}`);
      await FlashcardController.storeFlashcards(req, res);
    });

    // Get Entire Flashcards Dictionary
    this.router.get("/flashcards/:id", async (req, res) => {
      console.log(`GET /flashcards/${req.params.id}`);
      await FlashcardController.getFlashcards(req, res);
    });

    // Note: Individual flashcard operations are now managed on the frontend.
    // The backend only handles the dictionary as a whole, as per the new design.
  }

  getRouter() {
    return this.router;
  }
}

export default new FlashcardRoutes().getRouter();