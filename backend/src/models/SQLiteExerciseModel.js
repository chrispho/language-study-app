import {Sequelize, DataTypes} from "sequelize";

let Exercise;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

//define Exercise model

class _SQLiteExerciseModel {
  constructor() {
    this.initialized = false;
  }

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

  async create(exercise) {
    try {
      return await Exercise.create(exercise);
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw new Error("Unable to create exercise.");
    }
  }

  getModel() {
    return Exercise;
  }
}

const SQLiteExerciseModel = new _SQLiteExerciseModel();
export default SQLiteExerciseModel;