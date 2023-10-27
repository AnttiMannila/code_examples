import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
	const [viewBlog,setViewBlog] = useState(false)

	if (user.username === blog.user.username) {
		return (
			<div className="blog">
				{!viewBlog && <div>
					<p>{blog.title} <button onClick={() => setViewBlog(true)}>show</button></p>
				</div>}
				{viewBlog && <div>
					{blog.title} <button onClick={() => setViewBlog(false)}>hide</button>
					<button className='deleteButton' onClick={handleDelete}>delete</button>
					<br></br>
			by: {blog.author}
					<br></br>
					{blog.url}
					<br></br>
			likes: {blog.likes} <button id='likeButton' className='likeButton' onClick={handleLike}>like</button>
					<br></br>
			added by: {blog.user.name}
					<br></br>
				</div>}
			</div>
		)
	} else {
		return (
			<div className="blog">
				{!viewBlog && <div>
					<p>{blog.title} <button onClick={() => setViewBlog(true)}>show</button></p>
				</div>}
				{viewBlog && <div>
					{blog.title} <button onClick={() => setViewBlog(false)}>hide</button>
					<br></br>
			by: {blog.author}
					<br></br>
					{blog.url}
					<br></br>
			likes: {blog.likes} <button id='likeButton' className='likeButton' onClick={handleLike}>like</button>
					<br></br>
			added by: {blog.user.name}
					<br></br>
				</div>}
			</div>
		)
	}

}

export default Blog
