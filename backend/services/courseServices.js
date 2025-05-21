import { Course } from "../model/course/course.model.js";

export const createCourse = async (data) => {
  return await Course.create(data);
};

export const getAllCourses = async () => {
  return await Course.find({ status: "approved" }).populate(
    "createdBy",
    "name email"
  );
};

export const getCourseById = async (id) => {
  return await Course.findById(id).populate("createdBy", "name email");
};

export const updateCourse = async (id, data, userId) => {
  const course = await Course.findOneAndUpdate(
    { _id: id, createdBy: userId },
    data,
    { new: true }
  );
  return course;
};

export const deleteCourse = async (id, userId) => {
  return await Course.findOneAndDelete({ _id: id, createdBy: userId });
};

export const getCoursesByUser = async (userId) => {
  return await Course.find({ createdBy: userId });
};

export const reviewCourseService = async (courseId, status) => {
  return await Course.findByIdAndUpdate(courseId, { status }, { new: true });
};
