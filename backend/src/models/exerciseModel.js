import sequelize from "sequelize";

const ExerciseLibrary = sequelize.define("ExerciseLibrary", {
  exerciselistid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Exercise = sequelize.define("Exercise", {
  exerciseId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  exerciseListId: {
    type: DataTypes.UUID,
    references: {
      model: ExerciseList,
      key: "exerciseListId",
    },
  },
  questionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  options: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answerData: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

ExerciseLibrary.hasMany(Exercise, {
  foreignKey: 'exerciseListId',
  as: 'exercises'
});

Exercise.belongsTo(ExerciseLibrary, {
  foreignKey: 'exerciseListId',
  as: 'exerciseLibrary'
});

class _ExerciseModel {
  constructor() {}

  async init(fresh = false) {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // An exception will be thrown if either of these operations fail.

    if (fresh) {
      await this.delete();

      await this.create({
        task: "Description 1",
      });

      await this.create({
        task: "Description 2",
      });

      await this.create({
        task: "Description 3",
      });
    }
  }

  async createExerciseList(name) {
    try {
      return await ExerciseLibrary.create({ name: name });
    } catch {
      console.error("Error creating exercise list");
      throw new Error("Error creating exercise list");
    }
  }

  async createExercise() {
    const exerciseObj = {};
    try {
      return await Exercise.create(exerciseObj);
    } catch {
      console.error("Error creating exercise");
      throw new Error("Error creating exercise");
    }
  }

  async getExerciseLibrary(userId) {
    try {
      return await Exercise.findAll({
        where: {
          userId: userId,
        },
      });
    } catch {
      console.error(`Error fetching exercise #${exerciseId}`);
      throw new Error(`Failed to fetch exercise #${exerciseId}`);
    }
  }

  async getExercise(userId = null, exerciseId = null) {
    try {
      return await Exercise.findAll({
        where: {
          userId: userId,
          exerciseId: exerciseId,
        },
      });
    } catch {
      console.error(`Error fetching exercise #${exerciseId}`);
      throw new Error(`Failed to fetch exercise #${exerciseId}`);
    }
  }
}

// more verbose export singleton
const ExerciseModel = new _ExerciseModel();

export default ExerciseModel;
