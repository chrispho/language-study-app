import express from "express";
import ExerciseController from "../controllers/ExerciseController.js";

class ExerciseRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create Exercise
    this.router.post("/exercises", async (req, res) => {
      console.log("POST /exercises");
      await ExerciseController.createExercise(req, res);
    });

    // Get All Exercises
    this.router.get("/exercises", async (req, res) => {
      console.log("GET /exercises");
      await ExerciseController.getAllExercises(req, res);
    });

    // Get Exercise By ID
    this.router.get("/exercises/:id", async (req, res) => {
      console.log(`GET /exercises/${req.params.id}`);
      await ExerciseController.getExerciseByID(req, res);
    });

    // Update Exercise
    this.router.put("/exercises/:id", async (req, res) => {
      console.log(`PUT /exercises/${req.params.id}`);
      await ExerciseController.updateExercise(req, res);
    });

    // Delete Exercise
    this.router.delete("/exercises/:id", async (req, res) => {
      console.log(`DELETE /exercises/${req.params.id}`);
      await ExerciseController.deleteExercise(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new ExerciseRoutes().getRouter();
