import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let FlashcardCollection;

class _SQLiteFlashcardModel {
  constructor() {
    this.initialized = false;
  }

  async init(sequelize, fresh = true) {
    if (this.initialized) return;
    FlashcardCollection = sequelize.define("FlashcardCollection", {
      userID: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      flashcards: {
        type: DataTypes.JSON, // Store the entire collection as JSON
        allowNull: false,
        defaultValue: {}, // Start with an empty dictionary
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    await FlashcardCollection.sync({ force: fresh });
    if (fresh) {
      console.log("FlashcardCollection table created successfully.");
      await FlashcardCollection.destroy({ where: {} });
    } else {
      console.log("FlashcardCollection table connected to existing database!");
    }

    this.initialized = true;
  }

  async saveFlashcards(userID, flashcards) {
    try {
      const collection = await FlashcardCollection.findOne({ where: { userID } });
      if (collection) {
        collection.flashcards = flashcards;
        collection.updatedAt = new Date();
        await collection.save();
      } else {
        await FlashcardCollection.create({ userID, flashcards });
      }
    } catch (error) {
      console.error("Error saving flashcards:", error);
      throw new Error("Unable to save flashcards.");
    }
  }

  async getFlashcards(userID) {
    try {
      const collection = await FlashcardCollection.findOne({ where: { userID } });
      return collection ? collection.flashcards : null;
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      throw new Error("Unable to fetch flashcards.");
    }
  }

  getModel() {
    return FlashcardCollection;
  }
}

const SQLiteFlashcardModel = new _SQLiteFlashcardModel();
export default SQLiteFlashcardModel;
