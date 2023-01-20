const { Types } = require("mongoose");
const Blog = require("../models/blogModel");

// POST /blogs
exports.createBlog = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      user_id: req.userId,
      is_draft: false,
    };
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
      deleted_at: { $in: [null] },
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
    let updatedData = req.body;
    if (req.file) {
      updatedData = {
        ...req.body,
        cover_picture_url: req.file.path,
      };
    }
    const blog = await Blog.findByIdAndUpdate({ _id: id }, updatedData, {
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

// PATCH /blogs/delete/:id
exports.softDeleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      { _id: id },
      { deleted_at: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );
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
