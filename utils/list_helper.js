
const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
  };
  const favoriteBlog=(blogs)=>{
    if (!Array.isArray(blogs) || blogs.length === 0) {
        return null;
      }
      const favorite = blogs.reduce((prevBlog, currentBlog) =>
        prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog
      );
  
      return favorite;
  }
  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return 0;
    }
  
    const most = blogs.reduce((x, y) => {
      return x.blogs > y.blogs ? x : y;
    });
  
    return {
      author: most.author,
      blogs: most.blogs,
    };
  };
  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return 0;
    }
  
    const most = blogs.reduce((x, y) => {
      return x.likes > y.likes ? x : y;
    });
  
    return {
      author: most.author,
      likes: most.likes,
    };
  };
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,mostLikes
  }