import { uploadCloudinary } from "../helper/cloudinaryHelper.js";
import { Course } from "../model/course.js";
//CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const { title, description, text, videoTitles } = req.body;

    if (!req.files || !req.files.file || req.files.file.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }
    // Upload thumbnail image to Cloudinary

    const thumbnail = req.files.file[0];
    const { url, publicId } = await uploadCloudinary(thumbnail.path);

    // Parse JSON inputs
    const parsedText = typeof text === "string" ? JSON.parse(text) : text;
    const parsedTitles =
      typeof videoTitles === "string" ? JSON.parse(videoTitles) : videoTitles;

    // Upload video files
    const videoFiles = req.files?.videos || [];
    const uploadedVideos = [];

    for (let i = 0; i < videoFiles.length; i++) {
      const videoFile = videoFiles[i];
      const title = parsedTitles[i] || `video ${i + 1}`;
      const { url, publicId } = await uploadCloudinary(videoFile.path, "video");
      uploadedVideos.push({
        title,
        url,
        publicId,
      });
    }
    const newCourse = new Course({
      title,
      description,
      url,
      publicId,
      videos: uploadedVideos,
      text: parsedText,
      uploadedBy: req.user._id,
    });

    await newCourse.save();
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//GET ALL COURSES
export const getAllCourses = async (req, res) => {
  try {
    const filtered = req.onlyApproved ? { status: "approved" } : {};
    const courses = await Course.find(filtered);
    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "courses not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "All Courses Available",
        courses,
      });
    }
  } catch (error) {
    console.error("Error getting courses:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
//GET A SINGGLE COURSE BY ID
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course || (req.onlyApproved && course.status !== "approved")) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course retrieved successfully",
      course,
    });
  } catch (error) {
    console.error("Error getting a course:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//UPDATE COURSE BY ID

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Whitelist allowed fields
    const allowedFields = [
      "title",
      "description",
      "text",
      "url",
      "publicId",
      "videos",
    ];
    const updatedData = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updatedData[key] = req.body[key];
      }
    }
    if ("status" in req.body) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed to update the course status.",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//DELETE COURSE BY ID
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//course review
export const reviewCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { status } = req.body;
    const allowedStatus = ["pending", "approved", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: " Invalid status",
      });
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { status },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course status updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
