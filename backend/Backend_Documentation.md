**Backend Documentation: Models, Controllers, and Routers**
===========================================================

This document explains the structure and functionality of the backend database models, their corresponding controllers, and routers. It provides guidance for developers working on components such as flashcards, exercises, achievements, and progress, and how to extend and integrate these components with the front end.

* * * * *

**1\. Overview of Backend Structure**
-------------------------------------

The backend is built using **Sequelize** as the ORM, SQLite as the database, and **Express.js** for routing. Each functional unit (e.g., Flashcards, Exercises) is organized into three main parts:

-   **Model**: Defines the database schema and data-handling methods.
-   **Controller**: Handles business logic and connects models with routers.
-   **Router**: Defines the API endpoints for each unit.

* * * * *

**2\. Models**
--------------

### **2.1. User Model**

-   **Location**: `SQLiteUserModel.js`
-   **Purpose**: Manages user data such as username, email, password, and streak.
-   **Key Fields**:
    -   `userID`: UUID (Primary Key)
    -   `username`, `email`, `password`: Strings
    -   `userStreak`: Integer, tracks user activity streak
    -   `achievements`, `exercisesCompleted`, `flashcardsSaved`, `languageProgress`: JSON fields
-   **Key Relationships**:
    -   `User` has many `Achievements`, `Exercises`, `Flashcards`, and `Progress`.

### **2.2. Flashcard Model**

-   **Location**: `SQLiteFlashcardModel.js`
-   **Purpose**: Stores flashcard data for users.
-   **Key Fields**:
    -   `flashcardID`: UUID (Primary Key)
    -   `front`: String (front side of the card)
    -   `back`: String (back side of the card)
    -   `userID`: Foreign Key (references User)
-   **Relationships**:
    -   `Flashcard` belongs to `User`.

### **2.3. Exercise Model**

-   **Location**: `SQLiteExerciseModel.js`
-   **Purpose**: Tracks exercises completed by users.
-   **Key Fields**:
    -   `exerciseID`: UUID (Primary Key)
    -   `type`: String (e.g., "Quiz", "Listening")
    -   `content`: JSON (exercise details)
    -   `completedAt`: Date
    -   `userID`: Foreign Key (references User)
-   **Relationships**:
    -   `Exercise` belongs to `User`.

### **2.4. Achievement Model**

-   **Location**: `SQLiteAchievementsModel.js`
-   **Purpose**: Records achievements unlocked by users.
-   **Key Fields**:
    -   `achievementID`: UUID (Primary Key)
    -   `name`: String (achievement name)
    -   `description`: String (achievement description)
    -   `earnedAt`: Date
    -   `userID`: Foreign Key (references User)
-   **Relationships**:
    -   `Achievement` belongs to `User`.

### **2.5. Progress Model**

-   **Location**: `SQLiteProgressModel.js`
-   **Purpose**: Tracks users' language learning progress.
-   **Key Fields**:
    -   `progressID`: UUID (Primary Key)
    -   `language`: String (e.g., "English", "Spanish")
    -   `progress`: Integer (percentage of progress)
    -   `userID`: Foreign Key (references User)
-   **Relationships**:
    -   `Progress` belongs to `User`.

* * * * *

**3\. Controllers**
-------------------

Controllers handle requests and responses for each model. Each controller implements methods for CRUD operations (Create, Read, Update, Delete).

### **3.1. Common Controller Methods**

-   `createX(req, res)`: Adds a new record.
-   `getAllX(req, res)`: Retrieves all records.
-   `getXByID(req, res)`: Retrieves a specific record by ID.
-   `updateX(req, res)`: Updates a specific record by ID.
-   `deleteX(req, res)`: Deletes a specific record by ID.

### **3.2. Flashcard Controller**

-   **Location**: `FlashcardController.js`
-   **Usage**:
    -   To add flashcards:

        javascript

        Copy code

        `POST /v1/flashcards
        Body: { "front": "Hola", "back": "Hello (Spanish)", "userID": "<USER_ID>" }`

    -   To fetch all flashcards:

        javascript

        Copy code

        `GET /v1/flashcards`

### **3.3. Exercise Controller**

-   **Location**: `ExerciseController.js`
-   **Usage**:
    -   To add exercises:

        javascript

        Copy code

        `POST /v1/exercises
        Body: { "type": "Quiz", "content": { ... }, "userID": "<USER_ID>" }`

    -   To fetch all exercises:

        javascript

        Copy code

        `GET /v1/exercises`

### **3.4. Achievement Controller**

-   **Location**: `AchievementController.js`
-   **Usage**:
    -   To add achievements:

        javascript

        Copy code

        `POST /v1/achievements
        Body: { "name": "10 day streak", "description": "...", "userID": "<USER_ID>" }`

    -   To fetch achievements by user:

        javascript

        Copy code

        `GET /v1/achievements?userID=<USER_ID>`

### **3.5. Progress Controller**

-   **Location**: `ProgressController.js`
-   **Usage**:
    -   To add progress:

        javascript

        Copy code

        `POST /v1/progress
        Body: { "language": "English", "progress": 80, "userID": "<USER_ID>" }`

    -   To fetch progress:

        javascript

        Copy code

        `GET /v1/progress`

* * * * *

**4\. Routers**
---------------

Routers map endpoints to controller methods. Each module (Flashcard, Exercise, etc.) has a dedicated router.

### **4.1. Flashcard Routes**

-   **Location**: `flashcardRoutes.js`
-   **Endpoints**:
    -   `POST /v1/flashcards` → `createFlashcard`
    -   `GET /v1/flashcards` → `getAllFlashcards`

### **4.2. Exercise Routes**

-   **Location**: `exerciseRoutes.js`
-   **Endpoints**:
    -   `POST /v1/exercises` → `createExercise`
    -   `GET /v1/exercises` → `getAllExercises`

### **4.3. Achievement Routes**

-   **Location**: `achievementRoutes.js`
-   **Endpoints**:
    -   `POST /v1/achievements` → `createAchievement`
    -   `GET /v1/achievements` → `getAllAchievements`

### **4.4. Progress Routes**

-   **Location**: `progressRoutes.js`
-   **Endpoints**:
    -   `POST /v1/progress` → `createProgress`
    -   `GET /v1/progress` → `getAllProgress`

* * * * *

**5\. Extending the Models**
----------------------------

1.  **Add New Fields**: Update the relevant model file (e.g., `SQLiteExerciseModel.js`) with new fields in the `sequelize.define` method.

2.  **Add New Methods**: Extend the controller to include new methods (e.g., filtering exercises by type). Example:

    javascript

    Copy code

    `async getExercisesByType(req, res) {
      const { type } = req.query;
      const exercises = await Exercise.findAll({ where: { type } });
      return res.status(200).json({ success: true, data: exercises });
    }`

3.  **Integrate with Front End**:

    -   Use the provided API endpoints to fetch data for your components.
    -   Example for a Flashcard component:

        javascript

        Copy code

        `fetch('/v1/flashcards')
          .then(response => response.json())
          .then(data => console.log(data));`

* * * * *

**6\. Best Practices**
----------------------

-   **Reuse Models**: Leverage relationships and shared methods in controllers.
-   **Keep Front-End Decoupled**: Always use API endpoints instead of directly interacting with models.
-   **Test Thoroughly**: Validate each API endpoint with tools like Postman.
-   **Follow REST Standards**: Use appropriate HTTP methods (GET, POST, PUT, DELETE) for API operations.