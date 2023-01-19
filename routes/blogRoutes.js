const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// /blogs
router.get("/", getAllBlogs);
router.get("/:id", getBlog);

router.post("/:id", isAuth, createBlog);
router.put("/:id", isAuth, editBlog);
router.delete("/:id", isAuth, deleteBlog);

module.exports = router;
