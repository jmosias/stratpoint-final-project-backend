const { Types } = require("mongoose");
const Blog = require("../models/blogModel");

// POST /blogs
exports.createBlog = async (req, res, next) => {
  try {
    const data = { ...req.body, user_id: req.userId, is_draft: false };
    const blog = await Blog.create(data);
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

// GET /blogs
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

exports.getBlogsByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.find({
      user_id: { $in: [Types.ObjectId(id)] },
    });
    if (!blogs) {
      const error = new Error(`No blogs found from user id: ${id}`);
      error.statusCode = 404;
      next(error);
    } else {
      res.status(200).json(blogs);
    }
  } catch (error) {
    next(error);
  }
};

// GET /blogs/:id
exports.getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      const error = new Error(`No blog with id: ${id}`);
      error.statusCode = 404;
      next(error);
    } else {
      res.status(200).json(blog);
    }
  } catch (error) {
    next(error);
  }
};

// PUT /blogs/:id
exports.editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(blog);

    if (!blog) {
      const error = new Error(`No blog with id: ${id}`);
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// PATCH /blogs/:id
exports.patchBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(blog);

    if (!blog) {
      const error = new Error(`No blog with id: ${id}`);
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// DELETE /blogs/:id
exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: `No blog with id: ${id}` });
    } else {
      res.status(200).json({ message: `"${blog.title}" has been deleted` });
    }
  } catch (error) {
    next(error);
  }
};
