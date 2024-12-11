import {Sequelize, DataTypes} from "sequelize";

// Initializing Sequelize with SQLite dialect and specifying the storage file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let Progress; // Placeholder for the defined Progress model

// _SQLiteProgressModel handles the definition and interaction with the Progress model in SQLite
class _SQLiteProgressModel {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initializes the Progress model and syncs it with the database.
   * Optionally forces a fresh sync, dropping existing tables.
   * @param {Sequelize} sequelize - The Sequelize instance.
   * @param {boolean} fresh - Whether to force a fresh sync.
   */
  async init(sequelize, fresh = true) {
    if (this.initialized) return;
    Progress = sequelize.define("Progress", {
      progressID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });

    // Sync the Progress model with the database, optionally forcing a fresh sync
    await Progress.sync({ force: fresh });
    if (fresh) {
      console.log("Progress table created successfully.");
      await Progress.destroy({ where: {} });
    } else {
      console.log("Progress table connected to existing database!");
    }

    this.initialized = true;
  }

  /**
   * Creates a new progress record in the database.
   * @param {Object} record - The progress record data to create.
   * @returns {Promise<Object>} The created progress record.
   */
  async create(record) {
    try {
      return await Progress.create(record);
    } catch (error) {
      console.error("Error creating progress record:", error);
      throw new Error("Unable to create progress record.");
    }
  }

  /**
   * Retrieves all progress records from the database.
   * @returns {Promise<Array>} An array of progress record objects.
   */
  async findAll() {
    try {
      return await Progress.findAll();
    } catch (error) {
      console.error("Error fetching progress records:", error);
      throw new Error("Unable to fetch progress records.");
    }
  }

  /**
   * Retrieves a specific progress record by its ID.
   * @param {string} id - The progressID of the record to retrieve.
   * @returns {Promise<Object|null>} The progress record object or null if not found.
   */
  async findByPk(id) {
    try {
      return await Progress.findByPk(id);
    } catch (error) {
      console.error(`Error fetching progress record by ID ${id}:`, error);
      throw new Error("Unable to fetch progress record by ID.");
    }
  }

  /**
   * Deletes progress records based on specified options.
   * @param {Object} options - The options to determine which records to delete.
   * @returns {Promise<number>} The number of records deleted.
   */
  async destroy(options) {
    try {
      return await Progress.destroy(options);
    } catch (error) {
      console.error("Error destroying progress record:", error);
      throw new Error("Unable to destroy progress record.");
    }
  }

  /**
   * Retrieves the defined Progress model.
   * @returns {Object} The Sequelize Progress model.
   */
  getModel() {
    return Progress;
  }
}


// Instantiate the SQLiteProgressModel and export it
const SQLiteProgressModel = new _SQLiteProgressModel();
export default SQLiteProgressModel;