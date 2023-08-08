const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

let token = ''; 

beforeAll(async () => {
  const response = await api.post("/api/login").send({
    username: "markooo",
    password: "12345678",
  });

  token = response.body.token;
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("is id the id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("blog is created", async () => {
  const newBlog = {
    title: "da da",
    author: "ja",
    url: "asdasdasdas",
    likes: 2,
  };
  const initialResponse = await api.get("/api/blogs");
  const initialBlogsLength = initialResponse.body.length;

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const updatedResponse = await api.get("/api/blogs");
  const updatedBlogs = updatedResponse.body;

  const contents = updatedBlogs.map((x) => x.title);

  expect(updatedBlogs).toHaveLength(initialBlogsLength + 1);
  expect(contents).toContain("da da");
});

test("if blog doesn't have likes, it will be set to 0", async () => {
  let newBlog = {
    title: "da da",
    author: "ja",
    url: "asdasdasdas",
  };
  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toEqual(0);
});

test("if no title and url bad request", async () => {
  let newBlog = {
    author: "ja",
    likes: 1,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);
});

test("is delete working", async () => {
  const updatedResponse = await api.get("/api/blogs");
  const updatedBlogs = updatedResponse.body;
  await api
    .delete(`/api/${updatedBlogs[0].id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

test("does put work", async () => {
  const updatedResponse = await api.get("/api/blogs");
  const updatedBlogs = updatedResponse.body;
  const bodyContent = {
    title: "da da",
    author: "ja",
    url: "asdasdasdas",
    likes: 3,
  };
  await api
    .put(`/api/blogs/${updatedBlogs[0].id}`)
    .send(bodyContent)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const updatedResponseaa = await api.get("/api/blogs");
  const updatedBlogsaa = updatedResponseaa.body;

  expect(updatedBlogsaa[0].title).toEqual("da da");
});
