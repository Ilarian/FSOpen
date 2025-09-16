const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {listWithOneBlog, listWithMultipleBlogs} = require("./data")

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 31)
  })

  test('when list is empty', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {

    test('when given a list of blogs', () => {
        const favBlog = {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }

        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        assert.deepStrictEqual(favBlog, result)
    })

    test('when given empty list', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual({}, result)
    })

    test('when given a list of single blog', () => {
        const favBlog = {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }

        const result = listHelper.favoriteBlog([favBlog])
        assert.deepStrictEqual(favBlog, result)
    })

})

describe('Most blogs', () => {

    test("When list has multiple blogs", () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        assert.deepStrictEqual({author: 'Edsger W. Dijkstra', blogs: 2}, result)
    }) 

    test("When list has one blog", () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual({author: 'Edsger W. Dijkstra', blogs: 1}, result)
    })

    test("When list is empty", () => {
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual({author: '', blogs: 0}, result)
    })
})


describe('Most likes', () => {
    test("When list has multiple blogs", () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        assert.deepStrictEqual({author: 'Edsger W. Dijkstra', likes: 17}, result)
    })

    test("When list has one blog", () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual({author: 'Edsger W. Dijkstra', likes: 5}, result)
    })

    test("When list is empty", () => {
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual({author: '', likes: 0}, result)
    })
})
