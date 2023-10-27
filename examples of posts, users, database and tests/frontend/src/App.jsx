import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddNotification from './components/AddNotification'
import ErrorNotification from './components/ErrorNotification'
import AddBlog from './components/AddBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [message, setMessage] = useState(null)
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedPerson = window.localStorage.getItem('loggedUser')
		if(loggedPerson){
			const user = JSON.parse(loggedPerson)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const logout = () => (
		window.localStorage.clear(),
		window.location.reload()
	)

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility
		try {
			const newBlog = await blogService.create(blogObject)
			setBlogs(prevState => ([
				...prevState,
				newBlog
			]))
			setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch(exception) {
			setErrorMessage('Something went wrong... Try again')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
		blogFormRef.current.toggleVisibility()
	}

	const handleLike = async (id) => {
		const blogToUpdate = blogs.find( blog => blog.id === id)
		const updatedBlog = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes + 1,
			user: blogToUpdate.user
		}
		try {
			const returnedUpdatedBlog = await blogService.update(id, updatedBlog)
			setBlogs(blogs.map(blog => (blog.id === id ? returnedUpdatedBlog : blog)))
		} catch(exception) {
			setErrorMessage('Something went wrong... Try again')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleDelete = async (blogToDelete) => {
		const deleteBlog = blogs.find(blog => blog.id === blogToDelete)

		let confirm = window.confirm(`Do you want to delete ${deleteBlog.title}?`)
		if (confirm === true) {
			try{
				await blogService.del(deleteBlog)
				window.alert(`${deleteBlog.title} deleted`)
				setErrorMessage(`${deleteBlog.title} by ${deleteBlog.author} deleted`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
			}
			catch(exception){
				window.alert('Unauthorized')
			}
		}
		const allBlogs = await blogService.getAll()
		setBlogs(allBlogs)
	}

	const blogForm = () => (
		<Togglable buttonLabel1="add blog" buttonLabel2="cancel" ref={blogFormRef}>
			<AddBlog createBlog={addBlog} />
		</Togglable>
	)

	return (
		<div>
			<AddNotification message={message}/>
			<ErrorNotification message={errorMessage}/>
			{!user && <div>
				<h1>Login to blog application</h1>
				<Login
					setUser={setUser}
					setErrorMessage={setErrorMessage}
					setMessage={setMessage}
					blogs={blogs}
				/>
			</div>}
			{user && <div>
				<h1>Blog application</h1>
				<p>{user.name} logged in <button id='logoutButton' onClick={logout}>logout</button></p>
				{blogForm()}
				<h4>all blogs</h4>
				{blogs.sort((a, b) => b.likes - a.likes).map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						handleLike={() => handleLike(blog?.id)}
						handleDelete={() => handleDelete(blog?.id)}
						user={user}
					/>
				)}
			</div>
			}
		</div>
	)
}
export default App