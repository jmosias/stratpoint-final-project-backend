const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover_picture_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    is_draft: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
