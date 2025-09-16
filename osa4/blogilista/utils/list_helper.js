const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  blogs.forEach(blog => totalLikes += blog.likes)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return {}
  return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
}

const mostBlogs = (blogs) => {
  const blogMap = new Map()

  blogs.forEach(blog => {
    if(!blogMap.has(blog.author)){
      blogMap.set(blog.author, 1)
    }else{
      blogMap.set(blog.author, blogMap.get(blog.author)+1)
    }
  })

  let mostBlogs = {author: "", blogs: 0}
  blogMap.forEach( (value, key) => {
    if(value > mostBlogs.blogs) {
      mostBlogs = {author: key, blogs: value}
    }
  })

  return mostBlogs
}

const mostLikes = (blogs) => {
  const likeMap = new Map()

  blogs.forEach(blog => {
    if(!likeMap.has(blog.author)){
      likeMap.set(blog.author, blog.likes)
    }else{
      likeMap.set(blog.author, likeMap.get(blog.author)+blog.likes)
    }
  })

  let mostLikes = {author: "", likes: 0}
  likeMap.forEach( (value, key) => {
    if(value > mostLikes.likes) {
      mostLikes = {author: key, likes: value}
    }
  })

  return mostLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}