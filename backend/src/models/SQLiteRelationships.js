import { Sequelize, DataTypes } from "sequelize";
import SQLiteUserModel from "./SQLiteUserModel.js";
import SQLiteExerciseModel from "./SQLiteExerciseModel.js";
import SQLiteFlashcardModel from "./SQLiteFlashcardModel.js";
import SQLiteAchievementsModel from "./SQLiteAchievementsModel.js";
import SQLiteProgressModel from "./SQLiteProgressModel.js";

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Initialize models (fresh = false for production-like scenario, set true if you need to reset)
await SQLiteUserModel.init(sequelize, false);
await SQLiteExerciseModel.init(sequelize, false);
await SQLiteFlashcardModel.init(sequelize, false);
await SQLiteAchievementsModel.init(sequelize, false);
await SQLiteProgressModel.init(sequelize, false);

// Get actual Sequelize model instances
const User = SQLiteUserModel.getModel();
const Exercise = SQLiteExerciseModel.getModel();
const Flashcard = SQLiteFlashcardModel.getModel();
const Achievement = SQLiteAchievementsModel.getModel();
const Progress = SQLiteProgressModel.getModel();



// Define relationships
User.hasMany(Exercise, { foreignKey: "userID", onDelete: "CASCADE" });
Exercise.belongsTo(User, { foreignKey: "userID" });

User.hasMany(Flashcard, { foreignKey: "userID", onDelete: "CASCADE" });
Flashcard.belongsTo(User, { foreignKey: "userID" });

User.hasMany(Achievement, { foreignKey: "userID", onDelete: "CASCADE" });
Achievement.belongsTo(User, { foreignKey: "userID" });

User.hasMany(Progress, { foreignKey: "userID", onDelete: "CASCADE" });
Progress.belongsTo(User, { foreignKey: "userID" });

// Sync again to ensure relationships are applied (alter: true tries to minimize destructive changes)
await sequelize.sync({ alter: true });

console.log("All models and relationships initialized successfully!");

export {
  sequelize,
  SQLiteUserModel,
  SQLiteExerciseModel,
  SQLiteFlashcardModel,
  SQLiteAchievementsModel,
  SQLiteProgressModel
};
