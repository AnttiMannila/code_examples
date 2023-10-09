const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'from gods bathroom floor',
		author: 'atmosphere',
		url:'atmospheresucks.com',
		likes: 0,
	},
	{
		title: 'sunshine',
		author: 'atmosphere',
		url:'atmospheresucks.com',
		likes: 0
	},
	{
		title: 'modernman must hustle',
		author: 'atmosphere',
		url:'atmospheresucks.com',
		likes: 0
	}
]
const nonExistingId = async () => {
	const blog = new Blog ({ title:'willremovethissoon', author:'willremovethissoon',url:'willremovethissoon', })
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb,
}