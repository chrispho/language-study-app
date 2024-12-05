import ModelFactory from "../models/modelFactory.js";

class ExerciseController {
  constructor() {
    ModelFactory.getExerciseModel().then((model) => {
      this.model = model;
    });
  }

  async createExerciseList(req, res) {
    await this.model.createExerciseList();
  }

  async createExercise(req, res) {
    // TODO: Fix variables when request format is known
    const exerciseName = req;
    const question = req;
    const options = req;
    const answers = req;

    await this.model.createExercise();
  }

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

  // //essentially passes through params to model
  // async translate(req, res){
  //   const inLang = req.body.inLang;
  //   const outLang = req.body.outLang;
  //   const text = req.body.text;
  //   const translated = await this.model.translate(inLang, outLang, text);

  //   const error = false
  //   if(error){
  //     res.status(500).json({ error: "some error" })
  //   }

  //   console.log(`translated ${inLang} ${text} ===> ${outLang} ${translated}`)
  //   res.status(200).json({ translated: translated })
  // }
}

// export singleton
export default new ExerciseController();
