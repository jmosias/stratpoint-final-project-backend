const express = require("express");

const {
  signup,
  login,
  getUser,
  updateUser,
  updatePassword,
} = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const signupValidator = require("../validators/users/signup");
const passwordValidator = require("../validators/users/updatePassword");
const updateUserValidator = require("../validators/users/updateUser");

const router = express.Router();

// /users
router.post("/signup", signupValidator, signup);
router.post("/login", login);
router.get("/:id", getUser);
router.patch("/update", [isAuth, updateUserValidator], updateUser);
router.patch("/update_password", [isAuth, passwordValidator], updatePassword);

module.exports = router;
