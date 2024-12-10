import ModelFactory from "../models/modelFactory.js";

class FlashcardController {
  constructor() {
    this.modelPromise = ModelFactory.getDatabaseModel("sqlite-flashcard");
  }

  async getFlashcards(req, res){
    try{
      req.body; // Dont get
      const modelPromise = await this.modelPromise;
      const model = model.getModel();
      const flashcards = await model.findAll(); // Find all will just give me the dictionary?
      return res.status(201).json({ success: true, data: record });
    } catch(error){
      console.error("Error getting flashcards:", error);
      return res.status(500).json({ success: false, error: "Error getting flashcards." });
    }
  }

  async storeFlashcards(req, res){
    try{
      
      return res.status(201).json({ success: true});
    } catch(error){
      console.error("Error stroing flashcards:", error);
      return res.status(500).json({ success: false, error: "Error storing flashcards." });
    }
  }

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

export default new FlashcardController();
