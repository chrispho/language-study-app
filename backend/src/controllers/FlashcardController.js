import ModelFactory from "../models/modelFactory.js";

class FlashcardController {
  constructor() {
    this.modelPromise = ModelFactory.getDatabaseModel("sqlite-flashcard");
  }

  // Fetch the entire flashcard collection for a user
  async getFlashcards(req, res) {
    try {
      const { id } = req.params; // Fetch userID from the request body
      const model = await this.modelPromise;
      const FlashcardCollection = model.getModel();
      const collection = await FlashcardCollection.findOne({ where: { id } });
      if (!collection) {
        return res.status(404).json({ success: false, error: "Flashcard collection not found." });
      }
      return res.status(200).json({ success: true, data: collection.flashcards });
    } catch (error) {
      console.error("Error getting flashcards:", error);
      return res.status(500).json({ success: false, error: "Error getting flashcards." });
    }
  }

  // Store (update or create) the entire flashcard collection for a user
  async storeFlashcards(req, res) {
    try {
      const { id } = req.params; // Retrieve flashcards and userID from the request body
      const {flashcards} = req.body;
      const model = await this.modelPromise;
      const FlashcardCollection = model.getModel();

      const collection = await FlashcardCollection.findOne({ where: { id } });
      if (collection) {
        collection.flashcards = flashcards; // Update the existing collection
        collection.updatedAt = new Date();
        await collection.save();
      } else {
        await FlashcardCollection.create({ id, flashcards }); // Create a new collection
      }

      return res.status(201).json({ success: true, message: "Flashcards stored successfully." });
    } catch (error) {
      console.error("Error storing flashcards:", error);
      return res.status(500).json({ success: false, error: "Error storing flashcards." });
    }
  }
}

export default new FlashcardController();
