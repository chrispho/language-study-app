import ModelFactory from "../models/modelFactory.js";

class ExerciseController {
  constructor() {
    this.modelPromise = ModelFactory.getDatabaseModel("sqlite-exercise");
  }

  async createExercise(req, res) {
    try {
      const { type, content, userID } = req.body;
      const model = await this.modelPromise;
      const Exercise = model.getModel();
      const exercise = await Exercise.create({ type, content, userID });
      return res.status(201).json({ success: true, data: exercise });
    } catch (error) {
      console.error("Error creating exercise:", error);
      return res.status(500).json({ success: false, error: "Error creating exercise." });
    }
  }

  async getAllExercises(req, res) {
    try {
      const model = await this.modelPromise;
      const Exercise = model.getModel();
      const exercises = await Exercise.findAll();
      return res.status(200).json({ success: true, data: exercises });
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return res.status(500).json({ success: false, error: "Error fetching exercises." });
    }
  }

  async getExerciseByID(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Exercise = model.getModel();
      const exercise = await Exercise.findByPk(id);
      if (!exercise) return res.status(404).json({ success: false, error: "Exercise not found." });
      return res.status(200).json({ success: true, data: exercise });
    } catch (error) {
      console.error("Error fetching exercise:", error);
      return res.status(500).json({ success: false, error: "Error fetching exercise." });
    }
  }

  async updateExercise(req, res) {
    try {
      const { id } = req.params;
      const { type, content, completedAt } = req.body;
      const model = await this.modelPromise;
      const Exercise = model.getModel();
      const exercise = await Exercise.findByPk(id);
      if (!exercise) return res.status(404).json({ success: false, error: "Exercise not found." });

      exercise.type = type ?? exercise.type;
      exercise.content = content ?? exercise.content;
      exercise.completedAt = completedAt ?? exercise.completedAt;
      await exercise.save();

      return res.status(200).json({ success: true, data: exercise });
    } catch (error) {
      console.error("Error updating exercise:", error);
      return res.status(500).json({ success: false, error: "Error updating exercise." });
    }
  }

  async deleteExercise(req, res) {
    try {
      const { id } = req.params;
      const model = await this.modelPromise;
      const Exercise = model.getModel();
      const deleted = await Exercise.destroy({ where: { exerciseID: id } });
      if (!deleted) return res.status(404).json({ success: false, error: "Exercise not found." });
      return res.status(200).json({ success: true, message: "Exercise deleted." });
    } catch (error) {
      console.error("Error deleting exercise:", error);
      return res.status(500).json({ success: false, error: "Error deleting exercise." });
    }
  }
}

export default new ExerciseController();
