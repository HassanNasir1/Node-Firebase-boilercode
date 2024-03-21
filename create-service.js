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

// Check if any file already exists
if (
  fs.existsSync(controllerFile) ||
  fs.existsSync(modelFile) ||
  fs.existsSync(routeFile)
) {
  console.log(`Service '${serviceName}' already exists.`);
  process.exit(1);
}

// Generate controller file
fs.writeFileSync(controllerFile, getControllerTemplate(serviceName));

// Generate model file
fs.writeFileSync(modelFile, getModelTemplate(serviceName));

// Generate route file
fs.writeFileSync(routeFile, getRouteTemplate(serviceName));

// Update app.js to include the new route
const appJsContents = fs.readFileSync(appJsFile, "utf8");
const newRoute = `const ${serviceName}Routes = require('./routes/${serviceName}Routes');\napp.use('/api/${serviceName}', ${serviceName}Routes);`;
fs.writeFileSync(appJsFile, `${appJsContents}\n${newRoute}`);

// Provide feedback to the user
console.log(`Service '${serviceName}' created successfully!`);

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getControllerTemplate(serviceName) {
  const capitalizedServiceName = capitalizeFirstLetter(serviceName);
  return `// controllers/${serviceName}Controller.js
  
  const ${capitalizedServiceName} = require("../models/${serviceName}Model");
  
  // Create a ${serviceName}
  exports.create${capitalizedServiceName} = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }
  
      const ${serviceName.toLowerCase()} = new ${capitalizedServiceName}(name);
      await ${serviceName.toLowerCase()}.create();
      res.status(201).json({ message: "${serviceName} created successfully" });
    } catch (error) {
      console.error("Error creating ${serviceName}:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Get all ${serviceName}
  exports.getAll${capitalizedServiceName} = async (req, res) => {
    try {
      const ${serviceName.toLowerCase()} = await ${capitalizedServiceName}.findAll();
      res.json(${serviceName.toLowerCase()});
    } catch (error) {
      console.error("Error fetching ${serviceName}:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Get a single ${serviceName} by ID
  exports.get${capitalizedServiceName}ById = async (req, res) => {
    try {
      const ${serviceName.toLowerCase()}Id = req.params.id;
      const ${serviceName.toLowerCase()} = await ${capitalizedServiceName}.findById(${serviceName.toLowerCase()}Id);
      if (!${serviceName.toLowerCase()}) {
        return res.status(404).json({ error: "${serviceName} not found" });
      }
      res.json(${serviceName.toLowerCase()});
    } catch (error) {
      console.error("Error fetching ${serviceName}:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Update a ${serviceName} by ID
  exports.update${capitalizedServiceName} = async (req, res) => {
    try {
      const ${serviceName.toLowerCase()}Id = req.params.id;
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }
  
      const ${serviceName.toLowerCase()} = new ${capitalizedServiceName}(name);
      ${serviceName.toLowerCase()}.id = ${serviceName.toLowerCase()}Id; // Set the ${serviceName} ID
      await ${serviceName.toLowerCase()}.update();
      res.json({ message: "${serviceName} updated successfully", ${serviceName.toLowerCase()} });
    } catch (error) {
      console.error("Error updating ${serviceName}:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Delete a ${serviceName} by ID
  exports.delete${capitalizedServiceName} = async (req, res) => {
    try {
      const ${serviceName.toLowerCase()}Id = req.params.id;
      const ${serviceName.toLowerCase()} = new ${capitalizedServiceName}(); // Create a new ${serviceName} instance
      ${serviceName.toLowerCase()}.id = ${serviceName.toLowerCase()}Id; // Set the ${serviceName} ID
      await ${serviceName.toLowerCase()}.delete();
      res.json({ message: "${serviceName} deleted successfully", ${serviceName.toLowerCase()}Id });
    } catch (error) {
      console.error("Error deleting ${serviceName}:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  `;
}

// Function to generate model template
function getModelTemplate(serviceName) {
  const capitalizedServiceName = capitalizeFirstLetter(serviceName);

  return `
// models/${serviceName}Model.js

const admin = require("../config/firebase");
const db = admin.firestore();

class ${capitalizedServiceName} {
  constructor(name) {
    this.name = name;
  }

  async create() {
    try {
      const docRef = await db.collection("${serviceName}").add({
        name: this.name
      });
      console.log("${serviceName} saved to Firestore with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving ${serviceName} to Firestore:", error);
      throw error;
    }
  }

  static async findById(${serviceName}Id) {
    try {
      const docSnapshot = await db.collection("${serviceName}").doc(${serviceName}Id).get();
      if (docSnapshot.exists) {
        const ${serviceName}Data = docSnapshot.data();
        return { id: docSnapshot.id, ...${serviceName}Data };
      } else {
        return null; // ${serviceName} not found
      }
    } catch (error) {
      console.error("Error fetching ${serviceName} from Firestore:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const querySnapshot = await db.collection("${serviceName}").get();
      const ${serviceName} = [];
      querySnapshot.forEach((docSnapshot) => {
        ${serviceName}.push({ id: docSnapshot.id, ...docSnapshot.data() });
      });
      return ${serviceName};
    } catch (error) {
      console.error("Error fetching ${serviceName} from Firestore:", error);
      throw error;
    }
  }

  async update() {
    try {
      await db.collection("${serviceName}").doc(this.id).update({
        name: this.name
      });
      console.log("${serviceName} updated in Firestore:", this.id);
    } catch (error) {
      console.error("Error updating ${serviceName} in Firestore:", error);
      throw error;
    }
  }

  async delete() {
    try {
      await db.collection("${serviceName}").doc(this.id).delete();
      console.log("${serviceName} deleted from Firestore:", this.id);
    } catch (error) {
      console.error("Error deleting ${serviceName} from Firestore:", error);
      throw error;
    }
  }
}

module.exports = ${capitalizedServiceName};
`;
}

// Function to generate route template
function getRouteTemplate(serviceName) {
  const capitalizedServiceName = capitalizeFirstLetter(serviceName);
  return `// routes/${capitalizedServiceName}Routes.js
  
  const express = require('express');
  const router = express.Router();
  const ${capitalizedServiceName}Controller = require('../controllers/${capitalizedServiceName}Controller');
  
  // Route definitions for ${capitalizedServiceName}
  
  // Route to create a ${capitalizedServiceName} (public route, no authentication required)
  router
    .route('/')
    .post(${capitalizedServiceName}Controller.create${capitalizedServiceName})
    .get(${capitalizedServiceName}Controller.getAll${capitalizedServiceName}s);
  
  // Route to update a ${capitalizedServiceName} by ID
  router
    .route('/:id')
    .patch(${capitalizedServiceName}Controller.update${capitalizedServiceName})
    .delete(${capitalizedServiceName}Controller.delete${capitalizedServiceName})
    .get(${capitalizedServiceName}Controller.get${capitalizedServiceName}ById);
  
  module.exports = router;
  `;
}
