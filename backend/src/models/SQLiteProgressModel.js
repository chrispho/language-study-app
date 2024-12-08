import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

//define progress model

const Progress = sequelize.define("Progress", {
  progressID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  language: {
    type: DataTypes.STRING, // e.g., "english", "spanish"
    allowNull: false,
  },
  progress: {
    type: DataTypes.INTEGER, // Progress percentage or level
    defaultValue: 0,
    allowNull: false,
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false, // Foreign key to associate with the User model
  },
});
