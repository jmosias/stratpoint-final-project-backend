const express = require("express");
const { body } = require("express-validator");

const User = require("../models/userModel");
const { signup } = require("../controllers/userController");

const router = express.Router();

const MIN_PASSWORD = 6;
const MAX_PASSWORD = 72;
const MIN_USERNAME = 6;
const MAX_USERNAME = 18;

// /users
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: MIN_PASSWORD, max: MAX_PASSWORD }),
    body("username")
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username already exists");
          }
        });
      })
      .isLength({ min: MIN_USERNAME, max: MAX_USERNAME })
      .not()
      .isEmpty(),
    body("first_name").trim().not().isEmpty(),
    body("last_name").trim().not().isEmpty(),
  ],
  signup
);
// router.get("/");
// router.get("/:id");
// router.put("/:id");
// router.delete("/:id");

module.exports = router;
