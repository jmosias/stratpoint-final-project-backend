const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// /blogs
router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.put("/:id", editBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
