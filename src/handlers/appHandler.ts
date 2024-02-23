import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "../database/sequelize";
import allRoutes from "../routes/index";
import { seedUsers } from "../database/seeders/userSeeder";
import User from "../models/user";

class App {
  public app;

  constructor() {
    this.app = express();
  }

  // Method to configure middleware
  setupMiddleware() {
    this.app.use(bodyParser.json());
  }

  // Method to define routes
  setupRoutes() {
    this.app.use("/", allRoutes);
  }

  // Set up policy
  setupCorsPolicy(origin?: string) {
    const corsOptions = {
      origin: origin || "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    };

    this.app.use(cors(corsOptions));
  }

  //   Sync sequlize
  syncSequlize(force: boolean = false) {
    sequelize.sync({ force: force });
  }

  // Method to start the server
  startServer(port?: number | string) {
    this.app.listen(port || 3000);
  }

  // Method to handle seeder
  async seeder(force: boolean = false) {
    if (force) await User.bulkCreate(await seedUsers());
  }
}

export default App;
