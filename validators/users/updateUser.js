const { body } = require("express-validator");

const User = require("../../models/userModel");

const MIN_USERNAME = 6;
const MAX_USERNAME = 18;

const updateUserValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          if (userDoc._id.toString() !== req.userId)
            return Promise.reject("This email is already in used");
        }
      });
    })
    .normalizeEmail(),
  body("username")
    .trim()
    .custom((value, { req }) => {
      return User.findOne({ username: value }).then((userDoc) => {
        if (userDoc) {
          if (userDoc._id.toString() !== req.userId)
            return Promise.reject("This username is already in used");
        }
      });
    })
    .isLength({ min: MIN_USERNAME, max: MAX_USERNAME })
    .withMessage(`Please enter ${MIN_USERNAME} - ${MAX_USERNAME} characters`)
    .not()
    .isEmpty(),
  body("first_name").trim().not().isEmpty(),
  body("last_name").trim().not().isEmpty(),
];

module.exports = updateUserValidator;
