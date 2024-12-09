import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

let Progress;
//define progress model

class _SQLiteProgressModel {
  constructor() {
    this.initialized = false;
  }

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

    await Progress.sync({ force: fresh });
    if (fresh) {
      console.log("Progress table created successfully.");
      await Progress.destroy({ where: {} });
    } else {
      console.log("Progress table connected to existing database!");
    }

    this.initialized = true;
  }

  async create(record) {
    try {
      return await Progress.create(record);
    } catch (error) {
      console.error("Error creating progress record:", error);
      throw new Error("Unable to create progress record.");
    }
  }

  getModel() {
    return Progress;
  }
}

const SQLiteProgressModel = new _SQLiteProgressModel();
export default SQLiteProgressModel;