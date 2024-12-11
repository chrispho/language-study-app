import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Placeholder for the defined Achievement model
let Achievement;

// _SQLiteAchievementModel handles the definition and interaction with the Achievement model in SQLite
class _SQLiteAchievementModel {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initializes the Achievement model and syncs it with the database.
   * Optionally forces a fresh sync, dropping existing tables.
   * @param {Sequelize} sequelize - The Sequelize instance.
   * @param {boolean} fresh - Whether to force a fresh sync.
   */
  async init(sequelize, fresh = true) {
    if (this.initialized) return;
    Achievement = sequelize.define("Achievement", {
      achievementID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      earnedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });

    await Achievement.sync({ force: fresh });
    if (fresh) {
      console.log("Achievement table created successfully.");
      await Achievement.destroy({ where: {} });
    } else {
      console.log("Achievement table connected to existing database!");
    }

    this.initialized = true;
  }

  /**
   * Creates a new achievement record in the database.
   * @param {Object} achievement - The achievement data to create.
   * @returns {Promise<Object>} The created achievement record.
   */
  async create(achievement) {
    try {
      return await Achievement.create(achievement);
    } catch (error) {
      console.error("Error creating achievement:", error);
      throw new Error("Unable to create achievement.");
    }
  }

  /**
   * Retrieves all achievement records from the database.
   * @returns {Promise<Array>} An array of achievement objects.
   */
  async findAll() {
    try {
      return await Achievement.findAll();
    } catch (error) {
      console.error("Error fetching achievements:", error);
      throw new Error("Unable to fetch achievements.");
    }
  }

  /**
   * Retrieves a specific achievement by its ID.
   * @param {string} id - The achievementID of the record to retrieve.
   * @returns {Promise<Object|null>} The achievement record object or null if not found.
   */
  async findByPk(id) {
    try {
      return await Achievement.findByPk(id);
    } catch (error) {
      console.error(`Error fetching achievement by ID ${id}:`, error);
      throw new Error("Unable to fetch achievement by ID.");
    }
  }

  /**
   * Deletes achievement records based on specified options.
   * @param {Object} options - The options to determine which records to delete.
   * @returns {Promise<number>} The number of records deleted.
   */
  async destroy(options) {
    try {
      return await Achievement.destroy(options);
    } catch (error) {
      console.error("Error destroying achievement:", error);
      throw new Error("Unable to destroy achievement.");
    }
  }

  /**
   * Retrieves achievements associated with a specific userID.
   * @param {string} userID - The userID to filter achievements by.
   * @returns {Promise<Array>} An array of achievement objects for the specified user.
   */
  async findByUserID(userID) {
    try {
      return await Achievement.findAll({ where: { userID } });
    } catch (error) {
      console.error(`Error fetching achievements for user ${userID}:`, error);
      throw new Error("Unable to fetch achievements by userID.");
    }
  }

  /**
   * Retrieves the defined Achievement model.
   * @returns {Object} The Sequelize Achievement model.
   */
  getModel() {
    return Achievement;
  }
}

// Instantiate the SQLiteAchievementModel and export it
const SQLiteAchievementsModel = new _SQLiteAchievementModel();
export default SQLiteAchievementsModel;