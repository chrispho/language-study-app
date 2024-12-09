import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let Achievement;

//define Achievement model

class _SQLiteAchievementModel {
  constructor() {
    this.initialized = false;
  }

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

  async create(achievement) {
    try {
      return await Achievement.create(achievement);
    } catch (error) {
      console.error("Error creating achievement:", error);
      throw new Error("Unable to create achievement.");
    }
  }

  async findAll() {
    try {
      return await Achievement.findAll();
    } catch (error) {
      console.error("Error fetching achievements:", error);
      throw new Error("Unable to fetch achievements.");
    }
  }

  async findByPk(id) {
    try {
      return await Achievement.findByPk(id);
    } catch (error) {
      console.error(`Error fetching achievement by ID ${id}:`, error);
      throw new Error("Unable to fetch achievement by ID.");
    }
  }

  async destroy(options) {
    try {
      return await Achievement.destroy(options);
    } catch (error) {
      console.error("Error destroying achievement:", error);
      throw new Error("Unable to destroy achievement.");
    }
  }

  async findByUserID(userID) {
    try {
      return await Achievement.findAll({ where: { userID } });
    } catch (error) {
      console.error(`Error fetching achievements for user ${userID}:`, error);
      throw new Error("Unable to fetch achievements by userID.");
    }
  }

  getModel() {
    return Achievement;
  }
}

const SQLiteAchievementsModel = new _SQLiteAchievementModel();
export default SQLiteAchievementsModel;