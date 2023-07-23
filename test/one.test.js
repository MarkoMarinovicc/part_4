const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});
describe("most likes", () => {
  const listWithOneBlog = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];

  test("object of most liked blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
  describe("most blogs", () => {
    const blogsMany = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        blogs: 5,
      },
      {
        title: "Canonical string reduction",
        author: "asdasdasd",
        blogs: 1,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        blogs: 12,
      },
    ];
    test("one with moste bloges", () => {
      const result = listHelper.mostBlogs(blogsMany);
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        blogs: 12,
      });
    });
  });
  describe("most likes", () => {
    const blogsMany = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "asdasdasd",
        likes: 1,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "zzz",
        likes: 4,
      },
      {
        title: "Canonical string reduction",
        author: "asdasdassdsdwwwwwwd",
        likes: 2,
      },
      {
        title: "Canonical string reduction",
        author: "MArko",
        likes: 22,
      },
    ];
    test("one with moste bloges", () => {
      const result = listHelper.mostLikes(blogsMany);
      expect(result).toEqual({
        author: "MArko",
        likes: 22,
      });
    });
  });
});
