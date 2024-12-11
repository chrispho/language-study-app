import { Sequelize, DataTypes } from "sequelize";

let History;
//define history model

class _SQLiteTranslationHistoryModel {
  constructor() {
    this.initialized = false;
  }

  async init(sequelize, fresh = true) {
    if (this.initialized) return;
    History = sequelize.define("History", {
      entryid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      inLang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outLang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      output: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    await History.sync({ force: fresh });
    if (fresh) {
      console.log("Hist table created successfully.");
      await History.destroy({ where: {} });
    } else {
      console.log("Hist table connected to existing database!");
    }

    this.initialized = true;
  }

  async create(record) {
    try {
      return await History.create(record);
    } catch (error) {
      console.error("Error creating hist record:", error);
      throw new Error("Unable to create history record.");
    }
  }

  async findAll() {
    try {
      return await History.findAll();
    } catch (error) {
      console.error("Error fetching history records:", error);
      throw new Error("Unable to fetch history records.");
    }
  }

  getModel() {
    return History;
  }
}

const SQLiteTranslationHistoryModel = new _SQLiteTranslationHistoryModel();
export default SQLiteTranslationHistoryModel;