import ModelFactory from "../models/modelFactory.js";

class ExerciseController {
  constructor() {
    // Fetches the ExerciseModel from the ModelFactory and assigns it to the `this.model` property.
    ModelFactory.getExerciseModel().then((model) => {
      this.model = model;
    });
  }

  // Creates a new exercise list.
  async createExerciseList(req, res) {
    await this.model.createExerciseList();
  }

  // Creates a new exercise.
  async createExercise(req, res) {
    // Extract exercise details from the request body (adjust based on actual request format)
    const exerciseName = req.body.name;
    const question = req.body.question;
    const options = req.body.options;
    const answers = req.body.answers;

    await this.model.createExercise(exerciseName, question, options, answers); // Pass the extracted details to the model
  }

  // Retrieves a list of exercise libraries for a given user ID.
  async getExerciseLibrary(req, res, userId) {
    try {
      const exerciseLibrary = await this.model.getExerciseLibrary(userId);
      res.status(200).json(exerciseLibrary);
    } catch {
      console.error("Error fetching exercise library:", error);
      res.status(500).json({
        error: `Failed to fetch exercise library for user #${userId}`,
      });
    }
  }

  // Retrieves a specific exercise for a given user ID and exercise ID.
  async getExercise(req, res, userId, exerciseId) {
    try {
      const exercise = await this.model.getExercise(userId, exerciseId);
      res.status(200).json(exercise);
    } catch {
      console.error("Error fetching exercise:", error);
      res
        .status(500)
        .json({ error: `Failed to fetch exercise #${exerciseId}` });
    }
  }

  // Updates an existing exercise.
  async updateExercise(req, res, userId, exerciseId) {
    try {
      // Extract updated exercise details from the request body
      const updatedExercise = req.body; // Replace with specific properties to update

      const success = await this.model.updateExercise(userId, exerciseId, updatedExercise);

      if (success) {
        res.status(200).json({ message: "Exercise updated successfully" });
      } else {
        res.status(400).json({ error: "Failed to update exercise" });
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Deletes an existing exercise.
  async deleteExercise(req, res, userId, exerciseId) {
    try {
      const success = await this.model.deleteExercise(userId, exerciseId);

      if (success) {
        res.status(200).json({ message: "Exercise deleted successfully" });
      } else {
        res.status(400).json({ error: "Failed to delete exercise" });
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

// export singleton
export default new ExerciseController();
