import express from "express";
import { isFellow, isAdmin } from "../middleware/authentificationRole.js";
import { isAuthenticateUser } from "../middleware/authentification.js";
import { multerMiddleware } from "../middleware/upload.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  reviewCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { onlyApprovedCourse } from "../middleware/courseMiddleware.js";

export const courseRoute = express.Router();
//upload course

courseRoute.post(
  "/upload",
  isAuthenticateUser,
  isFellow,
  multerMiddleware.fields([{ name: "file", maxCount: 1 }, { name: "videos" }]),
  createCourse
);

//get all course
courseRoute.get("/", isAuthenticateUser, onlyApprovedCourse, getAllCourses);
//get a course by id
courseRoute.get(
  "/:courseId",
  isAuthenticateUser,
  onlyApprovedCourse,
  getCourseById
);
courseRoute.put(
  "/update/:courseId",
  isAuthenticateUser,
  isFellow,
  updateCourse
);
courseRoute.delete(
  "/delete/:courseId",
  isAuthenticateUser,
  isFellow,
  deleteCourse
);

//review course
courseRoute.put("/review/:courseId", isAuthenticateUser, isAdmin, reviewCourse);
