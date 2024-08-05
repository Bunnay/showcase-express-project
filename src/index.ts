import AppHelper from "./utils/appHelper";

const app = new AppHelper();
app.setupMiddleware();
app.setupCorsPolicy();
app.setupRoutes();
app.startServer(process.env.APP_PORT);
app.syncSequlize(false);
app.seeder(false);
