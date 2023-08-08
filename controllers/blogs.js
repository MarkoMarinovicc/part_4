const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/api/blogs", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!request.token) {
    return response.status(401).json({ error: "token missing" });
  }

  try {
    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
      user: user.id,
    });

    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: "Title and URL are required" });
    }

    const savedBlog = await blog.save();
    const testUsers = await Blog.findById(savedBlog.id).populate("user", {
      blog: 1,
    });
    const nesto = async () => {
      const response = await User.findByIdAndUpdate(
        { _id: user.id },
        { blog: [...testUsers.user[0].blog,savedBlog.id] }
      );
      return response;
    };
    nesto();
    response.json(savedBlog);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

blogRouter.delete("/api/:id", userExtractor, async (request, response) => {
  const id = request.params.id;
  const testUsers = await Blog.findById(id).populate("user");
  if (testUsers.user[0].blog[testUsers.user[0].blog.length-1].toString() === testUsers.id.toString()) {
    try {
      const blog = await Blog.findByIdAndDelete(id);
      response.status(200).json(blog);
    } catch (err) {
      console.log(err);
    }
  } else {
    response
      .status(401)
      .json({ error: "You are not user that write that blog" });
  }
});

blogRouter.put("/api/blogs/:id", async (request, response) => {
  const id = request.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title: request.body.title,
      url: request.body.url,
      author: request.body.author,
      likes: request.body.likes,
    },
    {
      new: true,
    }
  ).catch((err) => console.log(err));
  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
