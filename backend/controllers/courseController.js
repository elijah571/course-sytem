import cloudinary from "../config/cloudinary.js";
import * as CourseService from "../services/courseServices.js";

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
const allowedVideoTypes = ["video/mp4", "video/mov", "video/avi"];

export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate Image
    let imageUrl = "";
    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];
      if (!allowedImageTypes.includes(imageFile.mimetype)) {
        return res.status(400).json({
          error: "Invalid image format. Only JPEG, PNG, and GIF are allowed.",
        });
      }
      // Upload to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "courses/images",
      });
      imageUrl = imageUpload.secure_url;
    }

    // Validate and upload videos
    const videos = [];
    if (req.files?.videos?.length) {
      for (const video of req.files.videos) {
        if (!allowedVideoTypes.includes(video.mimetype)) {
          return res.status(400).json({
            error: "Invalid video format. Only MP4, MOV, and AVI are allowed.",
          });
        }
        const videoUpload = await cloudinary.uploader.upload(video.path, {
          resource_type: "video",
          folder: "courses/videos",
        });
        videos.push({ title: video.originalname, url: videoUpload.secure_url });
      }
    }

    // Create course in the database
    const course = await CourseService.createCourse({
      title,
      description,
      image: imageUrl,
      videos,
      createdBy: req.user._id,
    });

    // Respond with the created course
    res.status(201).json(course);
  } catch (error) {
    console.error("Error while creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
};

export const getAllCourses = async (req, res) => {
  const courses = await CourseService.getAllCourses();
  res.status(200).json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await CourseService.getCourseById(req.params.id);
  res.status(200).json(course);
};

export const updateCourse = async (req, res) => {
  const course = await CourseService.updateCourse(
    req.params.id,
    req.body,
    req.user._id
  );
  if (!course) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this course" });
  }
  res.status(200).json(course);
};

export const deleteCourse = async (req, res) => {
  const course = await CourseService.deleteCourse(req.params.id, req.user._id);
  if (!course) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this course" });
  }
  res.status(200).json({ message: "Course deleted successfully" });
};

export const reviewCourse = async (req, res) => {
  const { status } = req.body;
  const course = await CourseService.reviewCourseService(req.params.id, status);
  res.status(200).json(course);
};

export const getCoursesByUser = async (req, res) => {
  const courses = await CourseService.getCoursesByUser(req.user._id);
  res.status(200).json(courses);
};
