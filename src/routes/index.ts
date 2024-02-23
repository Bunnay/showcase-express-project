import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import express from "express";
const app = express();

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

export default app;
