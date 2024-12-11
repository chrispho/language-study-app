// Importing the ModelFactory to interact with the database models
import ModelFactory from "../models/modelFactory.js";

// ProgressController manages CRUD operations for progress records
class ProgressController {
  constructor() {
    this.modelPromise = ModelFactory.getDatabaseModel("sqlite-progress");
  }

  /**
   * Creates a new progress record in the database.
   * @param {Object} req - The request object containing progress details.
   * @param {Object} res - The response object to send back the result.
   */
  async createProgress(req, res) {
    try {
      const { language, progress, userID } = req.body;
      const model = await this.modelPromise;
      const Progress = model.getModel();
      const record = await Progress.create({ language, progress, userID });
      return res.status(201).json({ success: true, data: record });
    } catch (error) {
      console.error("Error creating progress record:", error);
      return res.status(500).json({ success: false, error: "Error creating progress record." });
    }
  }

  /**
   * Creates a new progress record in the database.
   * @param {Object} req - The request object containing progress details.
   * @param {Object} res - The response object to send back the result.
   */
  async getAllProgress(req, res) {
    try {
      const model = await this.modelPromise;
      const Progress = model.getModel();
      const progressRecords = await Progress.findAll();
      return res.status(200).json({ success: true, data: progressRecords });
    } catch (error) {
      console.error("Error fetching progress records:", error);
      return res.status(500).json({ success: false, error: "Error fetching progress records." });
    }
  }

  /**
   * Retrieves a specific progress record by its ID.
   * @param {Object} req - The request object containing the progress record ID.
   * @param {Object} res - The response object to send back the result.
   */
  async getProgressByID(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Progress = model.getModel();
      const record = await Progress.findByPk(id);
      if (!record) return res.status(404).json({ success: false, error: "Progress record not found." });
      return res.status(200).json({ success: true, data: record });
    } catch (error) {
      console.error("Error fetching progress record:", error);
      return res.status(500).json({ success: false, error: "Error fetching progress record." });
    }
  }

  /**
   * Updates an existing progress record based on its ID.
   * @param {Object} req - The request object containing updated progress details.
   * @param {Object} res - The response object to send back the result.
   */
  async updateProgress(req, res) {
    try {
      const { id } = req.params;
      const { language, progress } = req.body;
      const model = await this.modelPromise;
      const Progress = model.getModel();
      const record = await Progress.findByPk(id);
      if (!record) return res.status(404).json({ success: false, error: "Progress record not found." });

      record.language = language ?? record.language;
      record.progress = progress ?? record.progress;
      await record.save();

      return res.status(200).json({ success: true, data: record });
    } catch (error) {
      console.error("Error updating progress record:", error);
      return res.status(500).json({ success: false, error: "Error updating progress record." });
    }
  }

  /**
   * Deletes a progress record based on its ID.
   * @param {Object} req - The request object containing the progress record ID.
   * @param {Object} res - The response object to send back the result.
   */
  async deleteProgress(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Progress = model.getModel();
      const deleted = await Progress.destroy({ where: { progressID: id } });
      if (!deleted) return res.status(404).json({ success: false, error: "Progress record not found." });
      return res.status(200).json({ success: true, message: "Progress record deleted." });
    } catch (error) {
      console.error("Error deleting progress record:", error);
      return res.status(500).json({ success: false, error: "Error deleting progress record." });
    }
  }
}

// Export an instance of ProgressController as the default export
export default new ProgressController();
