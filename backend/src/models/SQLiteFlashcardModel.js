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

//let Flashcard;

// //define Flashcard model

// class _SQLiteFlashcardModel {
//   constructor() {
//     this.initialized = false;
//   }

//   async init(sequelize, fresh = true) {
//     if (this.initialized) return;
//     Flashcard = sequelize.define("Flashcard", { //Need to change:
//       flashcardID: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//       },
//       front: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       back: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       savedAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },
//       userID: {
//         type: DataTypes.UUID,
//         allowNull: false,
//       },
//     });

//     await Flashcard.sync({ force: fresh });
//     if (fresh) {
//       console.log("Flashcard table created successfully.");
//       await Flashcard.destroy({ where: {} });
//     } else {
//       console.log("Flashcard table connected to existing database!");
//     }

//     this.initialized = true;
//   }

//   async create(flashcard) {
//     try {
//       return await Flashcard.create(flashcard);
//     } catch (error) {
//       console.error("Error creating flashcard:", error);
//       throw new Error("Unable to create flashcard.");
//     }
//   }

//   async findAll() {
//     try {
//       return await Flashcard.findAll();
//     } catch (error) {
//       console.error("Error fetching flashcards:", error);
//       throw new Error("Unable to fetch flashcards.");
//     }
//   }

//   async findByPk(id) {
//     try {
//       return await Flashcard.findByPk(id);
//     } catch (error) {
//       console.error(`Error fetching flashcard by ID ${id}:`, error);
//       throw new Error("Unable to fetch flashcard by ID.");
//     }
//   }

//   async destroy(options) {
//     try {
//       return await Flashcard.destroy(options);
//     } catch (error) {
//       console.error("Error destroying flashcard:", error);
//       throw new Error("Unable to destroy flashcard.");
//     }
//   }

//   getModel() {
//     return Flashcard;
//   }
// }

const SQLiteFlashcardModel = new _SQLiteFlashcardModel();
export default SQLiteFlashcardModel;
