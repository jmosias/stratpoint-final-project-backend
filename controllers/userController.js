const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { password } = req.body;
  console.log(req.body);
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        ...req.body,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User created succcessfully!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
