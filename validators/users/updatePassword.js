const { body } = require("express-validator");

const MIN_PASSWORD = 6;
const MAX_PASSWORD = 72;

const passwordValidator = [
  body("old_password").trim().not().isEmpty(),
  body("new_password")
    .trim()
    .isLength({ min: MIN_PASSWORD, max: MAX_PASSWORD })
    .withMessage(`Please enter ${MIN_PASSWORD} - ${MAX_PASSWORD} characters`)
    .not()
    .isEmpty(),
];

module.exports = passwordValidator;
