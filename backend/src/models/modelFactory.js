/*
* ******************
! this you can extend with your own functions (see below)
* *****************
*/
import TranslationModel from "./translationModel.js";
import ExerciseModel from "./exerciseModel.js";

class _ModelFactory {
  // ! delete this in final version
  // async getTaskModel(model = "sqlite") {
  //   if (model === "sqlite") {
  //     return SQLiteTaskModel;
  //   } else if (model === "sqlite-fresh") {
  //     await SQLiteTaskModel.init(true);
  //     return SQLiteTaskModel;
  //   } else {
  //     return InMemoryTaskModel;
  //   }
  // }

  async getTranslationModel() {
    return TranslationModel;
  }

  async getExerciseModel() {
    return ExerciseModel;
  }
}

// more verbose export singleton
const ModelFactory = new _ModelFactory();
export default ModelFactory;
