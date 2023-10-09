const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)
const Blog = require('../models/blog')

describe('Blog tests', () => {

	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)
	})

	test('blogs are returned as json', async () => {
		console.log('testing started')
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const allBlogs = await api.get('/api/blogs')

		expect(allBlogs.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blog.id is id not _id', async () => {
		const allBlogs = await api.get('/api/blogs')

		expect(allBlogs.body[0].id).toBeDefined()
	})

	test('new blog can be added ', async () => {

		const newBlog = {
			title: 'Älä luovuta vielä',
			author: 'Teukka',
			url: 'eiole.com',
		}

		const user = await User.findOne({})
		const userForToken = {
			username: user.username,
			id: user.id
		}

		const token = jwt.sign(userForToken, process.env.SECRET)

		await api
			.post('/api/blogs')
			.set({ 'Authorization': `Bearer ${token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)


		const newAmountOfBlogs = await helper.blogsInDb()
		expect(newAmountOfBlogs).toHaveLength(helper.initialBlogs.length + 1)

		const authors = newAmountOfBlogs.map(b => b.author)
		const titles = newAmountOfBlogs.map(b => b.title)
		expect(titles).toContain('Älä luovuta vielä')
		expect(authors).toContain('Teukka')
	})

	test('if likes are null, value is 0', async () => {
		const newBlog = {
			title: 'parhas hipsteri lounas',
			author: 'SoMe Vaikuttaja',
			url: 'turhake.com',
		}

		const user = await User.findOne({})
		const userForToken = {
			username: user.username,
			id: user.id
		}

		const token = jwt.sign(userForToken, process.env.SECRET)

		await api
			.post('/api/blogs')
			.set({ 'Authorization': `Bearer ${token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const zeroLikes = await helper.blogsInDb()
		expect(zeroLikes.reverse()[0].likes).toBe(0)
	})

	test('without title or url, get 400 bad request', async () => {
		const newBlog = {
			author: 'SoMe Vaikuttaja',
			url: 'turhake.com',
			user: '6513fb3620c300da76c07ff4'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsInDb = await helper.blogsInDb()
		expect(blogsInDb).toHaveLength(helper.initialBlogs.length)

	})
	test('blog can be deleted', async () => {

		const newBlog = {
			title: 'Älä luovuta vielä',
			author: 'Teukka',
			url: 'eiole.com',
		}

		const user = await User.findOne({})
		const userForToken = {
			username: user.username,
			id: user.id
		}

		const token = jwt.sign(userForToken, process.env.SECRET)

		await api
			.post('/api/blogs')
			.set({ 'Authorization': `Bearer ${token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const allBlogs = await helper.blogsInDb()
		const deleteBlog = allBlogs[allBlogs.length -1]

		await api
			.delete(`/api/blogs/${deleteBlog.id}`)
			.set({ 'Authorization': `Bearer ${token}` })
			.expect(204)

		const newAmountOfBlogs = await helper.blogsInDb()
		expect(newAmountOfBlogs).toHaveLength(helper.initialBlogs.length)
		const titles = newAmountOfBlogs.map(b => b.title)
		expect(titles).not.toContain(deleteBlog.title)
	})

	test('likes can be added', async () => {
		const allBlogs = await helper.blogsInDb()
		const testBlog = allBlogs[0]
		const newLikes = {
			likes: 1000,
			user: '6513fb3620c300da76c07ff4'
		}

		await api
			.put(`/api/blogs/${testBlog.id}`)
			.send(newLikes)
			.expect(200)

		const newBlogs = await helper.blogsInDb()
		const listLikes = newBlogs.map(b => b.likes)
		expect(listLikes).toContain(1000)

	})
})

afterAll(async () => {
	await mongoose.connection.close()
})