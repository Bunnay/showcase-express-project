import App from "./handlers/appHandler";

const app = new App();
app.setupMiddleware();
app.setupCorsPolicy();
app.setupRoutes();
app.startServer(process.env.APP_PORT);
app.syncSequlize(false);
app.seeder(false);
