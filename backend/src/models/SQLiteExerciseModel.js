import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

//define Exercise model

const Exercise = sequelize.define("Exercise", {
  exerciseID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING, // e.g., "grammar", "vocabulary"
    allowNull: false,
  },
  content: {
    type: DataTypes.JSON, // Store the exercise content as JSON (e.g., questions, options)
    allowNull: false,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true, // Nullable if the exercise hasn't been completed yet
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false, // Foreign key to associate with the User model
  },
});