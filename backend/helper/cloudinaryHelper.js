import cloudinary from "../config/cloudinary.js";
export const uploadCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.log("Error while uploading to cloudinary", error);
    throw new Error("Error while uploading to cloudinary");
  }
};
