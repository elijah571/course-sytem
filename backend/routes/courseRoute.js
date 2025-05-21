import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  reviewCourse,
  getCoursesByUser,
} from "../controllers/courseController.js";
import { isFellow, isAdmin } from "../middleware/authentificationRole.js";
import { isAuthenticateUser } from "../middleware/authentification.js";
import { uploadCourseFiles } from "../middleware/upload.js";

export const router = express.Router();

// Public - all users
router.get("/", getAllCourses);
  
router.get("/:id", isAuthenticateUser, getCourseById);

// Fellow routes
router.post("/", isAuthenticateUser, isFellow, uploadCourseFiles, createCourse);
router.put("/:id", isAuthenticateUser, isFellow, updateCourse);
router.delete("/:id", isAuthenticateUser, isFellow, deleteCourse);
router.get("/user/my-courses", isAuthenticateUser, isFellow, getCoursesByUser);

// Admin route
router.put("/review/:id", isAuthenticateUser, isAdmin, reviewCourse);

export default router;
