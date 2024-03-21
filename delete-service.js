#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Parse command-line arguments
const args = process.argv.slice(2);
const serviceName = args[0];

// File paths
const controllerFile = path.join(
  __dirname,
  "controllers",
  `${serviceName}Controller.js`
);
const modelFile = path.join(__dirname, "models", `${serviceName}Model.js`);
const routeFile = path.join(__dirname, "routes", `${serviceName}Routes.js`);
const appJsFile = path.join(__dirname, "app.js");

// Check if any of the files don't exist
if (
  !fs.existsSync(controllerFile) ||
  !fs.existsSync(modelFile) ||
  !fs.existsSync(routeFile)
) {
  console.log(`Service '${serviceName}' does not exist.`);
  process.exit(1);
}

// Delete controller file
fs.unlinkSync(controllerFile);

// Delete model file
fs.unlinkSync(modelFile);

// Delete route file
fs.unlinkSync(routeFile);

// Remove the route from app.js
const appJsContents = fs.readFileSync(appJsFile, "utf8");
const routeRegex = new RegExp(
  `const ${serviceName}Routes = require\\('.*routes/${serviceName}Routes'\\);?\\s*app.use\\('/api/${serviceName}', ${serviceName}Routes\\);?`,
  "g"
);
const updatedAppJsContents = appJsContents.replace(routeRegex, "");
fs.writeFileSync(appJsFile, updatedAppJsContents);

// Provide feedback to the user
console.log(`Service '${serviceName}' deleted successfully!`);
