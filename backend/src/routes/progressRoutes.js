import express from "express";
import ProgressController from "../controllers/ProgressController.js";

class ProgressRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create Progress
    this.router.post("/progress", async (req, res) => {
      console.log("POST /progress");
      await ProgressController.createProgress(req, res);
    });

    // Get All Progress Records
    this.router.get("/progress", async (req, res) => {
      console.log("GET /progress");
      await ProgressController.getAllProgress(req, res);
    });

    // Get Progress By ID
    this.router.get("/progress/:id", async (req, res) => {
      console.log(`GET /progress/${req.params.id}`);
      await ProgressController.getProgressByID(req, res);
    });

    // Update Progress
    this.router.put("/progress/:id", async (req, res) => {
      console.log(`PUT /progress/${req.params.id}`);
      await ProgressController.updateProgress(req, res);
    });

    // Delete Progress
    this.router.delete("/progress/:id", async (req, res) => {
      console.log(`DELETE /progress/${req.params.id}`);
      await ProgressController.deleteProgress(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new ProgressRoutes().getRouter();
