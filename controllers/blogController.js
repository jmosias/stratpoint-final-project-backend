const Blog = require("../models/blogModel");

// POST /blogs
exports.createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /blogs
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /blogs/:id
exports.getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: `No blog with id: ${id}` });
    } else {
      res.status(200).json(blog);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: `No blog with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: `No blog with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};
