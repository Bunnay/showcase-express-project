import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import passwordRoutes from "./passwordRoutes";
import roleRoutes from "./roleRoutes";
import permissionGroupRoutes from "./permissionGroupRoutes";
import permissionRoutes from "./permissionRoutes";
import rolePermissionRoutes from "./rolePermissionRoutes";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import notificationRoutes from "./notificationRoutes";

import express from "express";
const app = express();

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/password", passwordRoutes);
app.use("/roles", roleRoutes);
app.use("/permission-groups", permissionGroupRoutes);
app.use("/permissions", permissionRoutes);
app.use("/roles-permissions", rolePermissionRoutes);
app.use("/notifications", notificationRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

export default app;
