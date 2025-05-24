import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connect } from "./config/connectDB.js";
import { authRouter } from "./routes/authRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { courseRoute } from "./routes/courseRoute.js";

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });
// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRoute);
// Connect to the database
connect();
