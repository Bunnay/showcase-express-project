import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import passwordRoutes from "./passwordRoutes";
import express from "express";
const app = express();

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/password", passwordRoutes);

export default app;
