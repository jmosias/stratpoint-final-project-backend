const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlog,
  editBlog,
  deleteBlog,
  getBlogsByUser,
} = require("../controllers/blogController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// /blogs
router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.get("/user/:id", getBlogsByUser);

router.post("/", isAuth, createBlog);
router.put("/:id", isAuth, editBlog);
router.delete("/:id", isAuth, deleteBlog);

module.exports = router;
