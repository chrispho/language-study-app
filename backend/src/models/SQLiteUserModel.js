import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let User; // will hold the defined model

class _SQLiteUserModel {
  constructor() {
    this.initialized = false;
  }

  async init(sequelize, fresh = false) {
    if (this.initialized) return;
    User = sequelize.define("User", {
      userID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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

    await User.sync({ force: fresh });

    const userCount = await User.count();
    if (userCount === 0) {
      console.log("No users found. Creating default users...");
      const demoUsers = [
        { username: "shivangmehta", email: "demo1@d.com", password: "demo1pass" },
        { username: "demo2", email: "demo2@d.com", password: "demo2pass" },
        { username: "demo3", email: "demo3@d.com", password: "demo3pass" },
      ];
      for (const u of demoUsers) {
        await this.create(u);
      }
    } else {
      console.log("User table already has data, no need to create defaults.");
    }

    this.initialized = true;
  }

  async create(user) {
    try {
      return await User.create(user);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Unable to create user.");
    }
  }

  async findAll() {
    try {
      return await User.findAll();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users.");
    }
  }

  async findByPk(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new Error("Unable to fetch user by ID.");
    }
  }

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

  async destroy(options) {
    try {
      return await User.destroy(options);
    } catch (error) {
      console.error("Error destroying user:", error);
      throw new Error("Unable to destroy user.");
    }
  }

  getModel() {
    return User;
  }
}

const SQLiteUserModel = new _SQLiteUserModel();
export default SQLiteUserModel;
