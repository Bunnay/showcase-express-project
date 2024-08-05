import fs from "fs";
import path from "path";
var inflection = require("inflection");

interface ModelInfo {
  model: string;
  displayName: string;
}

const models: { [key: string]: ModelInfo } = {};

fs.readdirSync(path.join(__dirname, "./")).forEach((file) => {
  if (file.endsWith(".ts")) {
    const fileName = file.split(".")[0];
    const fileNameToModelName = inflection.transform(fileName, [
      "underscore",
      "classify",
    ]);

    if (fileName != "index" && fileName != "apiResponse") {
      models[fileNameToModelName] = {
        model: require(`./${file}`)?.default,
        displayName: inflection.transform(fileName, [
          "underscore",
          "titleize",
          "capitalize",
        ]),
      };
    }
  }
});

export default models;
