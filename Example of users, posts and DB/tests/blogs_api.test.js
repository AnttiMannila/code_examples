const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'amannila',
			name: 'Antti Mannila',
			password: 'oldschool',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('username and password need to be atleast 3 characters long.', async () => {
		const users = await helper.usersInDb()
		const newUser = {
			username: 'ab',
			name: 'jaapo',
			password:'ldknfklsdänvkä'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const newUser2 = {
			username: 'agsfb',
			name: 'jaapo',
			password:'l'
		}

		const result2 = await api
			.post('/api/users')
			.send(newUser2)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username and password need to be more than 3 characters long ')
		expect(result2.body.error).toContain('username and password need to be more than 3 characters long ')
		const users2 = await helper.usersInDb()
		expect(users2).toHaveLength(users.length)
	})
})


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
		user: '6513fb3620c300da76c07ff4'
	}

	await api
		.post('/api/blogs')
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

	await api
		.post('/api/blogs')
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
	const allBlogs = await helper.blogsInDb()
	const deleteBlog = allBlogs[0]

	await api
		.delete(`/api/blogs/${deleteBlog.id}`)
		.expect(204)

	const newAmountOfBlogs = await helper.blogsInDb()
	expect(newAmountOfBlogs).toHaveLength(helper.initialBlogs.length - 1)
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



afterAll(async () => {
	await mongoose.connection.close()
})