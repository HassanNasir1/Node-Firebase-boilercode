// models/userModel.js

const admin = require("../config/firebase");

const db = admin.firestore();

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  async create() {
    try {
      const docRef = await db.collection("users").add({
        name: this.name,
        email: this.email,
      });
      console.log("User saved to Firestore with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
      throw error;
    }
  }
  static async findById(userId) {
    try {
      const docSnapshot = await db.collection("users").doc(userId).get();
      if (docSnapshot.exists) {
        const userData = docSnapshot.data();
        return { id: docSnapshot.id, ...userData };
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error("Error fetching user from Firestore:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const querySnapshot = await db.collection("users").get();
      const users = [];
      querySnapshot.forEach((docSnapshot) => {
        users.push({ id: docSnapshot.id, ...docSnapshot.data() });
      });
      return users;
    } catch (error) {
      console.error("Error fetching users from Firestore:", error);
      throw error;
    }
  }

  async update() {
    try {
      await db.collection("users").doc(this.id).update({
        name: this.name,
        email: this.email,
      });
      console.log("User updated in Firestore:", this.id);
    } catch (error) {
      console.error("Error updating user in Firestore:", error);
      throw error;
    }
  }

  async delete() {
    try {
      await db.collection("users").doc(this.id).delete();
      console.log("User deleted from Firestore:", this.id);
    } catch (error) {
      console.error("Error deleting user from Firestore:", error);
      throw error;
    }
  }
}

module.exports = User;
