import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./backend/model/users/user.js";
dotenv.config();

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("TestPassword123*", 10);

    const user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: hashedPassword,
    });

    await user.save();
    console.log(" Test user created successfully!");

    mongoose.disconnect();
  } catch (error) {
    console.error(" Error seeding user:", error);
    mongoose.disconnect();
  }
}

seedUser();
