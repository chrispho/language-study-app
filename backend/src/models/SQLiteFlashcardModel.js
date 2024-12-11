import {Sequelize, DataTypes} from "sequelize";

// Initializing Sequelize with SQLite dialect and specifying the storage file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let Flashcard; // Placeholder for the defined Flashcard model

// _SQLiteFlashcardModel handles the definition and interaction with the Flashcard model in SQLite
class _SQLiteFlashcardModel {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initializes the Flashcard model and syncs it with the database.
   * Optionally forces a fresh sync, dropping existing tables.
   * @param {Sequelize} sequelize - The Sequelize instance.
   * @param {boolean} fresh - Whether to force a fresh sync.
   */
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

    // Sync the Flashcard model with the database, optionally forcing a fresh sync
    await Flashcard.sync({ force: fresh });
    if (fresh) {
      console.log("Flashcard table created successfully.");
      await Flashcard.destroy({ where: {} });
    } else {
      console.log("Flashcard table connected to existing database!");
    }

    this.initialized = true;
  }

  /**
   * Creates a new flashcard record in the database.
   * @param {Object} flashcard - The flashcard data to create.
   * @returns {Promise<Object>} The created flashcard record.
   */
  async create(flashcard) {
    try {
      return await Flashcard.create(flashcard);
    } catch (error) {
      console.error("Error creating flashcard:", error);
      throw new Error("Unable to create flashcard.");
    }
  }

  /**
   * Retrieves all flashcard records from the database.
   * @returns {Promise<Array>} An array of flashcard objects.
   */
  async findAll() {
    try {
      return await Flashcard.findAll();
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      throw new Error("Unable to fetch flashcards.");
    }
  }

  /**
   * Retrieves a specific flashcard by its ID.
   * @param {string} id - The flashcardID of the record to retrieve.
   * @returns {Promise<Object|null>} The flashcard record object or null if not found.
   */
  async findByPk(id) {
    try {
      return await Flashcard.findByPk(id);
    } catch (error) {
      console.error(`Error fetching flashcard by ID ${id}:`, error);
      throw new Error("Unable to fetch flashcard by ID.");
    }
  }

  /**
   * Deletes flashcard records based on specified options.
   * @param {Object} options - The options to determine which records to delete.
   * @returns {Promise<number>} The number of records deleted.
   */
  async destroy(options) {
    try {
      return await Flashcard.destroy(options);
    } catch (error) {
      console.error("Error destroying flashcard:", error);
      throw new Error("Unable to destroy flashcard.");
    }
  }

  /**
   * Retrieves the defined Flashcard model.
   * @returns {Object} The Sequelize Flashcard model.
   */
  getModel() {
    return Flashcard;
  }
}

// Instantiate the SQLiteFlashcardModel and export it
const SQLiteFlashcardModel = new _SQLiteFlashcardModel();
export default SQLiteFlashcardModel;