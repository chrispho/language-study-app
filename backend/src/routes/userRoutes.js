import express from "express";
import UserController from "../controllers/UserController.js";

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create User
    this.router.post("/users", async (req, res) => {
      console.log("POST /users");
      await UserController.createUser(req, res);
    });

    // Get All Users
    this.router.get("/users", async (req, res) => {
      console.log("GET /users");
      await UserController.getAllUsers(req, res);
    });

    // Get User By ID
    this.router.get("/users/:id", async (req, res) => {
      console.log(`GET /users/${req.params.id}`);
      await UserController.getUserByID(req, res);
    });

    // Update User
    this.router.put("/users/:id", async (req, res) => {
      console.log(`PUT /users/${req.params.id}`);
      await UserController.updateUser(req, res);
    });

    // Delete User
    this.router.delete("/users/:id", async (req, res) => {
      console.log(`DELETE /users/${req.params.id}`);
      await UserController.deleteUser(req, res);
    });

    this.router.delete("/users", async (req, res) => {
      console.log(`DELETE /users/all from db`);
      await UserController.deleteAllUsers(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRoutes().getRouter();
