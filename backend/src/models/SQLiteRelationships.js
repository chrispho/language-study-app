import { Sequelize, DataTypes } from "sequelize";
import User from "./SQLiteUserModel.js";
import Exercise from "./SQLiteExerciseModel.js";
import Flashcard from "./SQLiteFlashcardModel.js";
import Achievement from "./SQLiteAchievementsModel.js";
import Progress from "./SQLiteProgressModel.js";

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL || "sqlite::memory:");

// Initialize models
const user = User(sequelize, DataTypes);
const exercise = Exercise(sequelize, DataTypes);
const flashcard = Flashcard(sequelize, DataTypes);
const achievement = Achievement(sequelize, DataTypes);
const progress = Progress(sequelize, DataTypes);

// Define relationships
user.hasMany(exercise, { foreignKey: "userID", onDelete: "CASCADE" });
exercise.belongsTo(user, { foreignKey: "userID" });

user.hasMany(flashcard, { foreignKey: "userID", onDelete: "CASCADE" });
flashcard.belongsTo(user, { foreignKey: "userID" });

user.hasMany(achievement, { foreignKey: "userID", onDelete: "CASCADE" });
achievement.belongsTo(user, { foreignKey: "userID" });

user.hasMany(progress, { foreignKey: "userID", onDelete: "CASCADE" });
progress.belongsTo(user, { foreignKey: "userID" });

// Export models and Sequelize instance
export { sequelize, Sequelize, user, exercise, flashcard, achievement, progress };
