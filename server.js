const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const connectToDatabase = require("./config/connectToDatabase");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const PORT = process.env.PORT || "7000";
const app = express();

// Photo Upload
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/blogs");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter }).single("profile_picture"));
app.use(multer({ storage: coverStorage, fileFilter }).single("cover_picture"));
app.use("/images", express.static("images"));
app.use(express.static("images"));

// Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

// Error Handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "";
  const data = error.data || {};
  const formType = error.formType || "";
  res.status(status).json({ message, data, formType });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
};

startServer();
