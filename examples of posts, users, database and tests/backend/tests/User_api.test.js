const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('User tests', () => {
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

afterAll(async () => {
	await mongoose.connection.close()
})