const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a user (public route, no authentication required)
router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

// Route to update a user by ID
router
  .route("/:id")
  //   .all(authMiddleware) // Applying authMiddleware to all methods on this route
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUserById);

// Protected route to fetch user profile (requires authentication)
// router.get('/profile', authMiddleware, userController.getUserProfile); // uncomment this line to enable authentication

module.exports = router;
