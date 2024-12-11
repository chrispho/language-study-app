import {Sequelize, DataTypes} from "sequelize";

let Exercise; // Placeholder for the defined Exercise model

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

//define Exercise model

// _SQLiteExerciseModel handles the definition and interaction with the Exercise model in SQLite
class _SQLiteExerciseModel {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initializes the Exercise model and syncs it with the database.
   * Optionally forces a fresh sync, dropping existing tables.
   * @param {Sequelize} sequelize - The Sequelize instance.
   * @param {boolean} fresh - Whether to force a fresh sync.
   */
  async init(sequelize, fresh = true) {
    if (this.initialized) return;
    Exercise = sequelize.define("Exercise", {
      exerciseID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });

    await Exercise.sync({ force: fresh });
    if (fresh) {
      console.log("Exercise table created successfully.");
      await Exercise.destroy({ where: {} });
    } else {
      console.log("Exercise table connected to existing database!");
    }

    this.initialized = true;
  }

  /**
   * Creates a new exercise record in the database.
   * @param {Object} exercise - The exercise data to create.
   * @returns {Promise<Object>} The created exercise record.
   */
  async create(exercise) {
    try {
      return await Exercise.create(exercise);
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw new Error("Unable to create exercise.");
    }
  }

  /**
   * Retrieves all exercise records from the database.
   * @returns {Promise<Array>} An array of exercise objects.
   */
  async findAll() {
    try {
      return await Exercise.findAll();
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw new Error("Unable to fetch exercises.");
    }
  }

  /**
   * Retrieves a specific exercise by its ID.
   * @param {string} id - The exerciseID of the record to retrieve.
   * @returns {Promise<Object|null>} The exercise record object or null if not found.
   */
  async findByPk(id) {
    try {
      return await Exercise.findByPk(id);
    } catch (error) {
      console.error(`Error fetching exercise by ID ${id}:`, error);
      throw new Error("Unable to fetch exercise by ID.");
    }
  }

  /**
   * Deletes exercise records based on specified options.
   * @param {Object} options - The options to determine which records to delete.
   * @returns {Promise<number>} The number of records deleted.
   */
  async destroy(options) {
    try {
      return await Exercise.destroy(options);
    } catch (error) {
      console.error("Error destroying exercise:", error);
      throw new Error("Unable to destroy exercise.");
    }
  }

  /**
   * Retrieves the defined Exercise model.
   * @returns {Object} The Sequelize Exercise model.
   */
  getModel() {
    return Exercise;
  }
}

// Instantiate the SQLiteExerciseModel and export it
const SQLiteExerciseModel = new _SQLiteExerciseModel();
export default SQLiteExerciseModel;