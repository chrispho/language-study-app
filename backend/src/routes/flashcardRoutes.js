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

   // initializeRoutes() {
  //   // Create Flashcard
  //   this.router.post("/flashcards", async (req, res) => {
  //     console.log("POST /flashcards");
  //     await FlashcardController.createFlashcard(req, res);
  //   });

  //   // Get All Flashcards
  //   this.router.get("/flashcards", async (req, res) => {
  //     console.log("GET /flashcards");
  //     await FlashcardController.getAllFlashcards(req, res);
  //   });

  //   // Get Flashcard By ID
  //   this.router.get("/flashcards/:id", async (req, res) => {
  //     console.log(`GET /flashcards/${req.params.id}`);
  //     await FlashcardController.getFlashcardByID(req, res);
  //   });

  //   // Update Flashcard
  //   this.router.put("/flashcards/:id", async (req, res) => {
  //     console.log(`PUT /flashcards/${req.params.id}`);
  //     await FlashcardController.updateFlashcard(req, res);
  //   });

  //   // Delete Flashcard
  //   this.router.delete("/flashcards/:id", async (req, res) => {
  //     console.log(`DELETE /flashcards/${req.params.id}`);
  //     await FlashcardController.deleteFlashcard(req, res);
  //   });
  // }
}

export default new FlashcardRoutes().getRouter();