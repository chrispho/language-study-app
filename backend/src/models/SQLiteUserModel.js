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

  async init(sequelize, fresh = true) {
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
    if (fresh) {
      console.log("User table created successfully.");
      await User.destroy({ where: {} });
      const demoUsers = [
        { username: "demo1", email: "demo1@d.com", password: "demo1pass" },
        { username: "demo2", email: "demo2@d.com", password: "demo2pass" },
        { username: "demo3", email: "demo3@d.com", password: "demo3pass" },
      ];
      for (const u of demoUsers) {
        await this.create(u);
      }
    } else {
      console.log("User table connected to existing database!");
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

  getModel() {
    return User;
  }
}

const SQLiteUserModel = new _SQLiteUserModel();
export default SQLiteUserModel;
