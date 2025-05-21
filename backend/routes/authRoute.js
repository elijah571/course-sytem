import express from "express";
import {
  signUpController,
  verifyAccountController,
  loginController,
  logoutUser,
  resetPasswordTokenController,
  resetPasswordController,
} from "../controllers/authController.js";
import { isAuthenticateUser } from "../middleware/authentification.js";

export const authRouter = express.Router();

// Register a new user
authRouter.post("/signup", signUpController);

// Verify user account
authRouter.post("/verify-account", verifyAccountController);
// User login
authRouter.post("/login", loginController);

// User logout
authRouter.post("/logout", logoutUser);
// Request password reset token
authRouter.post("/reset-token", resetPasswordTokenController);

// Reset password
authRouter.put("/reset-password/:resetToken", resetPasswordController);
