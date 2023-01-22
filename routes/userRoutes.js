const express = require("express");

const {
  signup,
  login,
  getUser,
  updateUser,
} = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const signupValidator = require("../validators/users/signup");
const updateUserValidator = require("../validators/users/updateUser");

const router = express.Router();

// /users
router.post("/signup", signupValidator, signup);
router.post("/login", login);
router.get("/:id", getUser);
router.patch("/update/:id", [isAuth, updateUserValidator], updateUser);

// router.get("/");
// router.put("/:id");
// router.delete("/:id");

module.exports = router;
