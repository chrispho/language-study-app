import express from "express";
import ExerciseController from "../controllers/exerciseController.js";
import { isAuthenticated } from "../auth/middleware.js";

class ExerciseRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    /*
    translates input
    POST? /translate
    response is { "TBD": "TBD" }
    200 or 500
    */
    // this.router.post("/translate", async (req, res) => {
    //   console.log("POST /translate")
    //   await TranslationController.translate(req, res)
    // })

    this.router.post(
      "/users/:id/exercises",
      isAuthenticated,
      async (req, res) => {
        const userId = req.params.id;
        console.log(`POST /users/${userId}/exercises`);
        await ExerciseController.createExercise(req, res);
      }
    );

    this.router.get(
      "/users/:id/exercises",
      isAuthenticated,
      async (req, res) => {
        const userId = req.params.id;
        console.log(`GET /users/${userId}/exercises`);
        await ExerciseController.getExerciseLibrary(req, res, userId)
      }
    );

    this.router.get(
      "/users/:id/exercises/:exerciseId",
      isAuthenticated,
      async (req, res) => {
        const userId = req.params.id;
        const exerciseId = req.params.exerciseId;
        console.log(`GET /users/${userId}/exercises/${exerciseId}`);
        await ExerciseController.getExercise(req, res, userId, exericseId)
      }
    );

    this.router.put(
      "/users/:id/exercises/:exerciseId",
      isAuthenticated,
      async (req, res) => {
        const userId = req.params.id;
        const exerciseId = req.params.exerciseId;
        console.log(`PUT /users/${userId}/exercises/${exerciseId}`);
        await ExerciseController.updateExercise(req, res, userId, exerciseId);
      }
    );
  
    this.router.delete(
      "/users/:id/exercises/:exerciseId",
      isAuthenticated,
      async (req, res) => {
        const userId = req.params.id;
        const exerciseId = req.params.exerciseId;
        console.log(`DELETE /users/${userId}/exercises/${exerciseId}`);
        await ExerciseController.deleteExercise(req.res, userId, exerciseId); // typo fixed here
      }
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new ExerciseRoutes().getRouter();
