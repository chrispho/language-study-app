// Importing the ModelFactory to interact with the database models
import ModelFactory from "../models/modelFactory.js";


// FlashcardController manages CRUD operations for flashcards
class FlashcardController {
  constructor() {
    this.modelPromise = ModelFactory.getDatabaseModel("sqlite-flashcard");
  }

  /**
   * Creates a new flashcard entry in the database.
   * @param {Object} req - The request object containing flashcard details.
   * @param {Object} res - The response object to send back the result.
   */
  async createFlashcard(req, res) {
    try {
      const { front, back, userID } = req.body;
      const model = await this.modelPromise;
      const Flashcard = model.getModel();
      const flashcard = await Flashcard.create({ front, back, userID });
      return res.status(201).json({ success: true, data: flashcard });
    } catch (error) {
      console.error("Error creating flashcard:", error);
      return res.status(500).json({ success: false, error: "Error creating flashcard." });
    }
  }

  /**
   * Retrieves all flashcards from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object to send back the results.
   */
  async getAllFlashcards(req, res) {
    try {
      const model = await this.modelPromise;
      const Flashcard = model.getModel();
      const flashcards = await Flashcard.findAll();
      return res.status(200).json({ success: true, data: flashcards });
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      return res.status(500).json({ success: false, error: "Error fetching flashcards." });
    }
  }

  /**
   * Retrieves a specific flashcard by its ID.
   * @param {Object} req - The request object containing the flashcard ID.
   * @param {Object} res - The response object to send back the result.
   */
  async getFlashcardByID(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Flashcard = model.getModel();
      const flashcard = await Flashcard.findByPk(id);
      if (!flashcard) return res.status(404).json({ success: false, error: "Flashcard not found." });
      return res.status(200).json({ success: true, data: flashcard });
    } catch (error) {
      console.error("Error fetching flashcard:", error);
      return res.status(500).json({ success: false, error: "Error fetching flashcard." });
    }
  }

  /**
   * Updates an existing flashcard based on its ID.
   * @param {Object} req - The request object containing updated flashcard details.
   * @param {Object} res - The response object to send back the result.
   */
  async updateFlashcard(req, res) {
    try {
      const { id } = req.params;
      const { front, back } = req.body;
      const model = await this.modelPromise;
      const Flashcard = model.getModel();
      const flashcard = await Flashcard.findByPk(id);
      if (!flashcard) return res.status(404).json({ success: false, error: "Flashcard not found." });

      flashcard.front = front ?? flashcard.front;
      flashcard.back = back ?? flashcard.back;
      await flashcard.save();
      return res.status(200).json({ success: true, data: flashcard });
    } catch (error) {
      console.error("Error updating flashcard:", error);
      return res.status(500).json({ success: false, error: "Error updating flashcard." });
    }
  }

  /**
   * Deletes a flashcard based on its ID.
   * @param {Object} req - The request object containing the flashcard ID.
   * @param {Object} res - The response object to send back the result.
   */
  async deleteFlashcard(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Flashcard = model.getModel();
      const deleted = await Flashcard.destroy({ where: { flashcardID: id } });
      if (!deleted) return res.status(404).json({ success: false, error: "Flashcard not found." });
      return res.status(200).json({ success: true, message: "Flashcard deleted." });
    } catch (error) {
      console.error("Error deleting flashcard:", error);
      return res.status(500).json({ success: false, error: "Error deleting flashcard." });
    }
  }
}

// Export an instance of FlashcardController as the default export
export default new FlashcardController();
