import express from "express";
import {
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
  updateProfileController,
} from "../controllers/userController.js";
import { isAuthenticateUser } from "../middleware/authentification.js";
import { isAdmin } from "../middleware/authentificationRole.js";

export const userRouter = express.Router();

// Get all users (Only accessible by Admin)
userRouter.get("/", isAuthenticateUser, isAdmin, getAllUsersController);

// Get a user by ID (Only accessible by Admin)
userRouter.get("/:userId", isAuthenticateUser, getUserByIdController);

// Update user profile and assign a role (Only accessible by Admin)
userRouter.put(
  "/update-user-role/:userId",
  isAuthenticateUser,
  isAdmin,
  updateProfileController
);

// Delete user (Only accessible by Admin)
userRouter.delete(
  "/delete/:userId",
  isAuthenticateUser,
  isAdmin,
  deleteUserByIdController
);
