const express = require("express");

const { signup, login, getUser } = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");
const signupValidator = require("../validators/users/signup");

const router = express.Router();

// /users
router.post("/signup", signupValidator, signup);
router.post("/login", login);
router.get("/:id", isAuth, getUser);

// router.get("/");
// router.put("/:id");
// router.delete("/:id");

module.exports = router;
