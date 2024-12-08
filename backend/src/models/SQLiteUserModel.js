import {Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

//define storage model

const User= sequelize.define("User", {
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
    defaultValue: 0, // Starts at 0 when a user is created
    allowNull: false,
  },
  achievements: {
    type: DataTypes.JSON,
    defaultValue: [], // Store an array of achievement IDs or descriptions
  },
  exercisesCompleted: {
    type: DataTypes.JSON,
    defaultValue: [], // Array of exercise objects
    allowNull: false,
  },
  flashcardsSaved: {
    type: DataTypes.JSON,
    defaultValue: [], // Array of flashcard objects
    allowNull: false,
  },
  languageProgress: {
    type: DataTypes.JSON,
    defaultValue: {
      english: 0, // Progress in English
      spanish: 0, // Progress in Spanish
      german: 0, // Progress in German
      french: 0, // Progress in French
    },
    allowNull: false,
  },
});