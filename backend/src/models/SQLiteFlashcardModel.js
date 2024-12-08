import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

//define Flashcard model

const Flashcard = sequelize.define("Flashcard", {
  flashcardID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  front: {
    type: DataTypes.STRING, // Front of the flashcard (e.g., "Hello")
    allowNull: false,
  },
  back: {
    type: DataTypes.STRING, // Back of the flashcard (e.g., "Hola")
    allowNull: false,
  },
  savedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false, // Foreign key to associate with the User model
  },
});
