import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let Flashcard;

//define Flashcard model

class _SQLiteFlashcardModel {
  constructor() {
    this.initialized = false;
  }

  async init(sequelize, fresh = true) {
    if (this.initialized) return;
    Flashcard = sequelize.define("Flashcard", {
      flashcardID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      front: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      back: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      savedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });

    await Flashcard.sync({ force: fresh });
    if (fresh) {
      console.log("Flashcard table created successfully.");
      await Flashcard.destroy({ where: {} });
    } else {
      console.log("Flashcard table connected to existing database!");
    }

    this.initialized = true;
  }

  async create(flashcard) {
    try {
      return await Flashcard.create(flashcard);
    } catch (error) {
      console.error("Error creating flashcard:", error);
      throw new Error("Unable to create flashcard.");
    }
  }

  getModel() {
    return Flashcard;
  }
}

const SQLiteFlashcardModel = new _SQLiteFlashcardModel();
export default SQLiteFlashcardModel;