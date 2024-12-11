/*
* ******************
! this you can extend with your own functions (see below)
* *****************
*/
import SQLiteUserModel from "./SQLiteUserModel.js";
import SQLiteTaskModel from "./taskModel.js";
import TranslationModel from "./translationModel.js"
import SQLiteExerciseModel from "./SQLiteExerciseModel.js";
import SQLiteFlashcardModel from "./SQLiteFlashcardModel.js";
import SQLiteAchievementsModel from "./SQLiteAchievementsModel.js";
import SQLiteProgressModel from "./SQLiteProgressModel.js";

class _ModelFactory {

  async getTranslationModel(){
    return TranslationModel;
  }

  /*
    The `getDatabaseModel` function returns models based on a key.
    Available keys could be:
    - "sqlite" or "sqlite-user" for the user model
    - "sqlite-exercise" for the exercise model
    - "sqlite-flashcard" for the flashcard model
    - "sqlite-achievement" for the achievement model
    - "sqlite-progress" for the progress model
    - "sqlite-task" for the task model (if still in use)
  */
    async getDatabaseModel(model = "sqlite") {
      if (model === "sqlite" || model === "sqlite-user") {
        return SQLiteUserModel;
        console.log("sqlite-user model called");
      } else if (model === "sqlite-fresh") {
        // If you still need "fresh" logic, you can re-init the user model
        // This will drop and recreate the table.
        await SQLiteUserModel.init(true);
        return SQLiteUserModel;
      } else if (model === "sqlite-exercise") {
        return SQLiteExerciseModel;
      } else if (model === "sqlite-flashcard") {
        return SQLiteFlashcardModel;
      } else if (model === "sqlite-achievement") {
        return SQLiteAchievementsModel;
      } else if (model === "sqlite-progress") {
        return SQLiteProgressModel;
      } else {
        // Default or fallback model
        return SQLiteTaskModel;
      }
    }
}

// more verbose export singleton
const ModelFactory = new _ModelFactory();
export default ModelFactory;
