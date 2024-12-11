import sequelize from "sequelize";

// Define the ExerciseLibrary model
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

// Define the Exercise model
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

// establish the one-to-many relationship between libraries and exercises.
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

  // Initialize the database connection and synchronize models
  async init(fresh = false) {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // An exception will be thrown if either of these operations fail.

    if (fresh) {
      await this.delete();
    }
  }

  // Create a new exercise list
  async createExerciseList(name) {
    try {
      return await ExerciseLibrary.create({ name: name });
    } catch {
      console.error("Error creating exercise list");
      throw new Error("Error creating exercise list");
    }
  }


  // Create a new exercise (missing parameters for `exerciseListId`, `questionType`, `question`, `options`, and `answerData`)
  async createExercise() {
    const exerciseObj = {}; // Empty object, needs to be filled with actual exercise data
    try {
      return await Exercise.create(exerciseObj);
    } catch {
      console.error("Error creating exercise");
      throw new Error("Error creating exercise");
    }
  }

  // Get exercise libraries for a specific user 
  async getExerciseLibrary(userId) {
    try {
      return await Exercise.findAll({
        where: {
          userId: userId,
        },
      });
    } catch {
      console.error(`Error fetching exercises for user #${userId}`);
      throw new Error(`Failed to fetch exercises for user #${userId}`);
    }
  }

  // Get exercises for a specific user and exercise ID
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
