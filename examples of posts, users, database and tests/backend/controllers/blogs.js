const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
	const body = request.body

	if (!request.user.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(request.user.id)

	const blog = new Blog({
		title : body.title,
		author : body.author,
		url : body.url,
		likes : body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	const user = request.user

	if (blog.user.toString()!== user.id.toString()) {
		return response.status(401).json({ error: 'invalid user' })
	}

	if (blog.user.toString()=== user.id.toString()) {
		await Blog.findByIdAndRemove(request.params.id)
		return response.status(204).end()
	}
})

blogsRouter.put('/:id',(request, response, next) => {
	const body = request.body

	const blog = {
		title : body.title,
		author : body.author,
		url : body.url,
		likes : body.likes,
	}
	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updatedBLog => { response.json(updatedBLog) })
		.catch(error => next(error))
})

module.exports = blogsRouter