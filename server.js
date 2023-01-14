const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToDatabase = require("./config/connectToDatabase");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const PORT = process.env.PORT || "7000";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error Handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

// Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
};

startServer();
