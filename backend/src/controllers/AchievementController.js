// Importing the ModelFactory to interact with the database models
import ModelFactory from "../models/modelFactory.js";

// AchievementController manages CRUD operations for achievements
class AchievementController {
  constructor() {
    this.modelPromise = ModelFactory.getDatabaseModel("sqlite-achievement");
  }

  /**
   * Creates a new achievement entry in the database.
   * @param {Object} req - The request object containing achievement details.
   * @param {Object} res - The response object to send back the result.
   */
  async createAchievement(req, res) {
    try {
      const { name, description, userID } = req.body;
      const model = await this.modelPromise;
      const Achievement = model.getModel();
      const achievement = await Achievement.create({ name, description, userID });
      return res.status(201).json({ success: true, data: achievement });
    } catch (error) {
      console.error("Error creating achievement:", error);
      return res.status(500).json({ success: false, error: "Error creating achievement." });
    }
  }

  /**
   * Retrieves all achievements from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object to send back the results.
   */

  async getAllAchievements(req, res) {
    try {
      const model = await this.modelPromise;
      const Achievement = model.getModel();
      const achievements = await Achievement.findAll();
      return res.status(200).json({ success: true, data: achievements });
    } catch (error) {
      console.error("Error fetching achievements:", error);
      return res.status(500).json({ success: false, error: "Error fetching achievements." });
    }
  }

  /**
   * Retrieves a specific achievement by its ID.
   * @param {Object} req - The request object containing the achievement ID.
   * @param {Object} res - The response object to send back the result.
   */
  async getAchievementByID(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Achievement = model.getModel();
      const achievement = await Achievement.findByPk(id);
      if (!achievement) return res.status(404).json({ success: false, error: "Achievement not found." });
      return res.status(200).json({ success: true, data: achievement });
    } catch (error) {
      console.error("Error fetching achievement:", error);
      return res.status(500).json({ success: false, error: "Error fetching achievement." });
    }
  }

   /**
   * Updates an existing achievement based on its ID.
   * @param {Object} req - The request object containing updated achievement details.
   * @param {Object} res - The response object to send back the result.
   */
  async updateAchievement(req, res) {
    try {
      const { id } = req.params;
      const { name, description, earnedAt } = req.body;
      const model = await this.modelPromise;
      const Achievement = model.getModel();
      const achievement = await Achievement.findByPk(id);
      if (!achievement) return res.status(404).json({ success: false, error: "Achievement not found." });

      achievement.name = name ?? achievement.name;
      achievement.description = description ?? achievement.description;
      achievement.earnedAt = earnedAt ?? achievement.earnedAt;
      await achievement.save();

      return res.status(200).json({ success: true, data: achievement });
    } catch (error) {
      console.error("Error updating achievement:", error);
      return res.status(500).json({ success: false, error: "Error updating achievement." });
    }
  }

   /**
   * Finds achievements based on the provided userID.
   * @param {Object} req - The request object containing the userID query parameter.
   * @param {Object} res - The response object to send back the results.
   */
  async findByUserID(req, res) {
    try {
      const { userID } = req.query;
      if (!userID) {
        return res.status(400).json({ success: false, error: "userID is required." });
      }

      const achievements = await this.model.findByUserID(userID);
      return res.status(200).json(achievements);
    } catch (error) {
      console.error("Error fetching achievements by userID:", error);
      return res.status(500).json({ success: false, error: "Error fetching achievements by userID." });
    }
  }

  /**
   * Deletes an achievement based on its ID.
   * @param {Object} req - The request object containing the achievement ID.
   * @param {Object} res - The response object to send back the result.
   */
  async deleteAchievement(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Achievement = model.getModel();
      const deleted = await Achievement.destroy({ where: { achievementID: id } });
      if (!deleted) return res.status(404).json({ success: false, error: "Achievement not found." });
      return res.status(200).json({ success: true, message: "Achievement deleted." });
    } catch (error) {
      console.error("Error deleting achievement:", error);
      return res.status(500).json({ success: false, error: "Error deleting achievement." });
    }
  }
}

// Export an instance of AchievementController as the default export
export default new AchievementController();
