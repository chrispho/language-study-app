import { Sequelize, DataTypes } from "sequelize";

// Initializing Sequelize with SQLite dialect and specifying the storage file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let User; // will hold the defined model

// Helper functions to generate random data
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomLanguageProgress() {
  return {
    english: getRandomInt(0, 100),
    spanish: getRandomInt(0, 100),
    german: getRandomInt(0, 100),
    french: getRandomInt(0, 100),
  };
}

function generateAchievements() {
  return [
    { name: "10 day streak", description: "Completed a 10-day streak" },
    { name: "100 words translated", description: "Translated 100 words successfully" },
    { name: "50% language progress", description: "Reached 50% overall progress" },
  ];
}

function generateExercises() {
  // Randomly generate scores and dates if desired
  return [
    { name: "Spanish Quiz", date: "2024-11-10", score: getRandomInt(50, 100) },
    { name: "French Listening", date: "2024-11-12", score: getRandomInt(50, 100) },
  ];
}

function generateFlashcards() {
  return [
    { front: "Hola", back: "Hello (Spanish)" },
    { front: "Merci", back: "Thank you (French)" },
  ];
}

// _SQLiteUserModel handles the definition and interaction with the User model in SQLite
class _SQLiteUserModel {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initializes the User model and syncs it with the database.
   * Optionally forces a fresh sync, dropping existing tables.
   * Also populates the database with default users if none exist.
   * @param {Sequelize} sequelize - The Sequelize instance.
   * @param {boolean} fresh - Whether to force a fresh sync.
   */
  async init(sequelize, fresh = false) {
    if (this.initialized) return;
    User = sequelize.define("User", {
      userID: {
        type: DataTypes.STRING,
        defaultValue: "1",
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      userStreak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      achievements: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      exercisesCompleted: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false,
      },
      flashcardsSaved: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false,
      },
      languageProgress: {
        type: DataTypes.JSON,
        defaultValue: {
          english: 0,
          spanish: 0,
          german: 0,
          french: 0,
        },
        allowNull: false,
      },
    });

    // Sync the User model with the database, optionally forcing a fresh sync
    await User.sync({ force: fresh });

    const userCount = await User.count();
    if (userCount === 0) {
      console.log("No users found. Creating default users...");
      const demoUsers = [
        { username: "shivangmehta", email: "demo1@d.com", password: "demo1pass" },
      ];
      // Sync the User model with the database, optionally forcing a fresh sync
      for (const u of demoUsers) {
        await this.create({
          ...u,
          userStreak: getRandomInt(0, 200),
          achievements: generateAchievements(),
          exercisesCompleted: generateExercises(),
          flashcardsSaved: generateFlashcards(),
          languageProgress: generateRandomLanguageProgress(),
        });
      }
    } else {
      console.log("User table already has data, no need to create defaults.");
    }

    this.initialized = true; // Mark as initialized to prevent re-initialization
  }

  /**
   * Creates a new user in the database.
   * @param {Object} user - The user data to create.
   * @returns {Promise<Object>} The created user object.
   */
  async create(user) {
    try {
      return await User.create(user);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Unable to create user.");
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<Array>} An array of user objects.
   */
  async findAll() {
    try {
      return await User.findAll();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users.");
    }
  }

  /**
   * Retrieves a user by their primary key (userID).
   * @param {string} id - The userID of the user to retrieve.
   * @returns {Promise<Object|null>} The user object or null if not found.
   */
  async findByPk(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new Error("Unable to fetch user by ID.");
    }
  }

  /**
   * Updates a user's information based on their userID.
   * @param {string} id - The userID of the user to update.
   * @param {Object} updates - An object containing the fields to update.
   * @returns {Promise<Object|null>} The updated user object or null if not found.
   */
  async updateUser(id, updates) {
    try {
      const [rowsUpdated, [updatedUser]] = await User.update(updates, {
        where: { userID: id },
        returning: true,
      });

      if (rowsUpdated === 0) {
        return null; // No user found or no changes made
      }
      return updatedUser;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new Error("Unable to update user.");
    }
  }

  /**
   * Deletes a user based on specified options.
   * @param {Object} options - The options to determine which user(s) to delete.
   * @returns {Promise<number>} The number of rows deleted.
   */
  async destroy(options) {
    try {
      return await User.destroy(options);
    } catch (error) {
      console.error("Error destroying user:", error);
      throw new Error("Unable to destroy user.");
    }
  }

  /**
   * Deletes all users from the database.
   * @returns {Promise<number>} The number of users deleted.
   */
  async deleteAll() {
    try {
      const rowsDeleted = await User.destroy({ where: {} });
      return rowsDeleted; // returns number of rows deleted
    } catch (error) {
      console.error("Error deleting all users:", error);
      throw new Error("Unable to delete all users.");
    }
  }

  /**
   * Deletes all users from the database.
   * @returns {Promise<number>} The number of users deleted.
   */
  getModel() {
    return User;
  }
}

// Instantiate the SQLiteUserModel and export it
const SQLiteUserModel = new _SQLiteUserModel();
export default SQLiteUserModel;
