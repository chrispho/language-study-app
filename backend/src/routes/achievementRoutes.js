import express from "express";
import AchievementController from "../controllers/AchievementController.js";

class AchievementRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create Achievement
    this.router.post("/achievements", async (req, res) => {
      console.log("POST /achievements");
      await AchievementController.createAchievement(req, res);
    });

    // Get All Achievements
    this.router.get("/achievements", async (req, res) => {
      console.log("GET /achievements");
      await AchievementController.getAllAchievements(req, res);
    });

    // Get Achievement By ID
    this.router.get("/achievements/:id", async (req, res) => {
      console.log(`GET /achievements/${req.params.id}`);
      await AchievementController.getAchievementByID(req, res);
    });

    // Update Achievement
    this.router.put("/achievements/:id", async (req, res) => {
      console.log(`PUT /achievements/${req.params.id}`);
      await AchievementController.updateAchievement(req, res);
    });

    // Delete Achievement
    this.router.delete("/achievements/:id", async (req, res) => {
      console.log(`DELETE /achievements/${req.params.id}`);
      await AchievementController.deleteAchievement(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new AchievementRoutes().getRouter();
