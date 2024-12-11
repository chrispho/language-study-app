// Importing the ModelFactory to interact with the database models
import ModelFactory from "../models/modelFactory.js";

// UserController manages CRUD operations for users
class UserController {
  constructor() {
    // Get the user model via ModelFactory
    // this.modelPromise = ModelFactory.getDatabaseModel("sqlite-user");
    ModelFactory.getDatabaseModel("sqlite-user").then((model) => {
      this.model = model;
    })
  }

  /**
   * Creates a new user entry in the database.
   * @param {Object} req - The request object containing user details.
   * @param {Object} res - The response object to send back the result.
   */
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await this.model.create({ username, email, password });
      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ success: false, error: "Error creating user." });
    }
  }

  /**
   * Creates a new user entry in the database.
   * @param {Object} req - The request object containing user details.
   * @param {Object} res - The response object to send back the result.
   */
  async getAllUsers(req, res) {
    try {
      
      const users = await this.model.findAll();
      return res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ success: false, error: "Error fetching users." });
    }
  }

  /**
   * Retrieves a specific user by their ID.
   * @param {Object} req - The request object containing the user ID.
   * @param {Object} res - The response object to send back the result.
   */
  async getUserByID(req, res) {
    try {
      const { id } = req.params;
      const user = await this.model.findByPk(id);
      if (!user) return res.status(404).json({ success: false, error: "User not found." });
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ success: false, error: "Error fetching user." });
    }
  }

  /**
   * Updates an existing user based on their ID.
   * @param {Object} req - The request object containing updated user details.
   * @param {Object} res - The response object to send back the result.
   */
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const user = await this.model.findByPk(id);

      if (!user) return res.status(404).json({ success: false, error: "User not found." });
      user.username = username ?? user.username;
      user.email = email ?? user.email;
      if (password) user.password = password; // Consider hashing in production

      await user.save();
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ success: false, error: "Error updating user." });
    }
  }

  /**
   * Deletes a user based on their ID.
   * @param {Object} req - The request object containing the user ID.
   * @param {Object} res - The response object to send back the result.
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.model.destroy({ where: { userID: id } });

      if (!deleted) return res.status(404).json({ success: false, error: "User not found." });
      return res.status(200).json({ success: true, message: "User deleted." });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ success: false, error: "Error deleting user." });
    }
  }

  /**
   * Deletes all users from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object to send back the result.
   */
  async deleteAllUsers(req, res) {
    try {
      const rowsDeleted = await this.model.deleteAll();
      if (rowsDeleted === 0) {
        return res.status(200).json({ success: true, message: "No users to delete." });
      }
      return res.status(200).json({ success: true, message: `${rowsDeleted} users deleted.` });
    } catch (error) {
      console.error("Error deleting all users:", error);
      return res.status(500).json({ success: false, error: "Error deleting all users." });
    }
  }
}

// Export an instance of UserController as the default export
export default new UserController();
