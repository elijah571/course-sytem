import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    text: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],

    url: { type: String, required: true },
    publicId: { type: String, required: true },
    videos: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
