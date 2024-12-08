import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

//define Achievement model

const Achievement = sequelize.define("Achievement", {
  achievementID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // Name of the achievement (e.g., "First 10 Exercises")
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING, // Description of the achievement
    allowNull: true,
  },
  earnedAt: {
    type: DataTypes.DATE,
    allowNull: true, // Nullable if the achievement hasn't been earned yet
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false, // Foreign key to associate with the User model
  },
});
