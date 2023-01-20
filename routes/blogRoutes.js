const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlog,
  editBlog,
  softDeleteBlog,
  getBlogsByUser,
  patchBlog,
} = require("../controllers/blogController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// /blogs
router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.get("/user/:id", getBlogsByUser);

router.post("/", isAuth, createBlog);
router.put("/:id", isAuth, editBlog);
router.patch("/delete/:id", isAuth, softDeleteBlog);
router.patch("/update/:id", isAuth, patchBlog);

module.exports = router;
