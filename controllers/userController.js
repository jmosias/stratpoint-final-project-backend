const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
    return;
  }

  if (!req.file) {
    const error = new Error("Please provide an image");
    error.statusCode = 422;
    next(error);
    return;
  }

  const { password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        ...req.body,
        password: hashedPassword,
        profile_picture_url: req.file.path,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User created succcessfully!", userId: result._id });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("User with this email could not be found");
        error.formType = "email";
        error.statusCode = 401;
        next(error);
      } else {
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.formType = "password";
        error.statusCode = 401;
        next(error);
      } else {
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString(),
          },
          "secret",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Logged in succcessfully!",
          token,
          userId: loadedUser._id.toString(),
        });
      }
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      const error = new Error(`No user with id: ${id}`);
      error.statusCode = 404;
      next(error);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;
    if (req.file) {
      updatedData = {
        ...req.body,
        profile_picture_url: req.file.path,
      };
    }
    const user = await User.findByIdAndUpdate({ _id: id }, updatedData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(user);

    if (!user) {
      const error = new Error(`No user with id: ${id}`);
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
