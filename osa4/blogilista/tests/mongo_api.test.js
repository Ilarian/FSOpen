const { test, after, beforeEach, before, describe, it } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/Blog")
const User = require("../models/User")
const { listWithMultipleBlogs } = require('./data')
const api = supertest(app)


before(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
    })

after(async () => {
        await mongoose.connection.close()
})

describe.only("User API", () => {
    

    it.only("Users are fetched properly", async () => {
        const res = await api.get('/api/users/').expect(200)
    })

    it.only("User is added to database properly", async() => {
        const user = {
            username: "tester",
            password: "testpassword",
            name: "Test User"
        }
        const res = await api.post('/api/users/').send(user).expect(201)
        const newUser = await User.findById(res.body.id)
        assert.strictEqual(newUser.username, user.username)
        assert.strictEqual(newUser.name, user.name)
    })

    it.only("Invalid data is handled correctly", async() => {
        //faulty data
        const f1 = {username: "as", password:"asdasdasd", name:"adfa"}
        const f2 = {username: "albert", password:"as", name:"asdasd"}
        const f3 = {username: "asda", password:"asda"}
        const f4 = {username: "pasta", password:"", name:"", extra:""}
        const f5 = {password:"", name:"", extra:""}

        //taulukko.forEach(data => await api.post().send(data).expect(400))
        await api.post('/api/users/').send(f1).expect(400)
        await api.post('/api/users/').send(f2).expect(400)
        await api.post('/api/users/').send(f3).expect(400)
        await api.post('/api/users/').send(f4).expect(400)
        await api.post('/api/users/').send(f5).expect(400)
    })

    it.only("User with same name causes an error", async() => {
        const user = {
            username: "tester",
            password: "testpassword",
            name: "Test User"
        }
        await api.post('/api/users/').send(user).expect(500)
    })

    it.only("Adds an user and blog post for the user, returns correct info", async () => {
        const blog = {
                "title": "Cancer rates of mice exposed to air",
                "author": "Stein, Edgar Ingrosso",
                "url": "realscience.com/cancer-rate-of-mice-study",
                "likes": 2,
            }

        await api.post('/api/blogs/').send(blog).expect(201)

        const res = await api.get('/api/blogs/')
        assert.strictEqual(res.body[0].user.hasOwnProperty('username'), true)
    })


})

describe("TESTS", () => {
    after(async () => {
        await mongoose.connection.close()
    })

    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = listWithMultipleBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    describe("Blogs are fetched correctly", () => {

        test('Blogs are returned as json and is the right length', async () => {
            const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
            assert.strictEqual(response.body.length, listWithMultipleBlogs.length)
        })

        test('Blog id is properly formatted', async() => {
            const response = await api.get('/api/blogs/').expect(200)
            response.body.forEach(blog => {
                assert.equal(blog.hasOwnProperty('id'), true)
            })
        })

    })

    describe("Blogs are added correctly", () => {

        test('Blogs can be added and the length is incremented properly', async() => {
            const newBlog = {
                "title": "Cancer rates of mice exposed to air",
                "author": "Stein, Edgar Ingrosso",
                "url": "realscience.com/cancer-rate-of-mice-study",
                "likes": 2,
            }
            
            await api.post('/api/blogs/').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
            const response = await api.get('/api/blogs/')
            const titles = response.body.map(blog => blog.title)
            assert.strictEqual(response.body.length, listWithMultipleBlogs.length + 1)
            assert(titles.includes("Cancer rates of mice exposed to air"))

        })

        test('When adding a blog without like field, it\'s set to zero', async() => {
            const newBlog = {
                "title": "Likelyhood of breaking a program when omiting fields",
                "author": "Stein, Edgar Ingrosso",
                "url": "realscience.com/omited-fields-study",
            }
            const response = await api.post('/api/blogs/').send(newBlog).expect(201)
            assert.strictEqual(response.body.likes, 0)
        })

        test('When adding a blog without title or url HTTP responds with status 400', async() => {
            const faultyOne = {
                "author": "Stein, Edgar Ingrosso",
                "url": "realscience.com/omited-fields-study",
            }

            const faultyTwo = {
                "title": "Likelyhood of breaking a program when omiting fields",
                "author": "Stein, Edgar Ingrosso",
            }

            await api.post('/api/blogs').send(faultyOne).expect(400)
            await api.post('/api/blogs').send(faultyTwo).expect(400)
        })

    })

    describe("Blogs are removed correctly", () => {

        test("When id is correct", async() => {
            await api.delete('/api/blogs/68c91acf65251697a0e34958').expect(204)
        })

        test("When the id is incorrect", async() => {
            await api.delete('/api/blogs/68c91acf65asd2516jd12358').expect(400)
        })

    })

    describe("Blog is updated correctly", () => {

        test("When body has all the info", async() => {
            updatedBlog = {
                "_id": "68c91acf65251697a0e34958",
                "title": "Jarin toka blogikirjotus",
                "author": "Kosonen, Jari",
                "url": "Jari.fi/blogi/14",
                "likes": 385,
                "__v": 0
            }

            await api.put('/api/blogs/68c91acf65251697a0e34958').send(updatedBlog).expect(200)

            const results = await api.get('/api/blogs').expect(200)
            titles = results.body.map(r => r.title)
            assert(titles.includes("Jarin toka blogikirjotus"))
        })

        test("When body is missing info", async() => {
            updatedBlog = {
                "_id": "68c91acf65251697a0e34958",
                "url": "Jari.fi/blogi/2",
                "likes": 8,
                "__v": 0
            }

            await api.put('/api/blogs/68c91acf65251697a0e34958').send(updatedBlog).expect(200)

            const results = await api.get('/api/blogs').expect(200)
            urls = results.body.map(r => r.url)
            assert(urls.includes("Jari.fi/blogi/2"))

        })

        test("When the id is incorrect", async() => {
            updatedBlog = {
                "_id": "68c91acf65251697a0e34958",
                "url": "Jari.fi/blogi/2",
                "likes": 8,
                "__v": 0
            }

            await api.put('/api/blogs/68c9gxcvb8').send(updatedBlog).expect(400)
        })

    })

})




