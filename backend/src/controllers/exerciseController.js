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
}

// export singleton
export default new ExerciseController();
