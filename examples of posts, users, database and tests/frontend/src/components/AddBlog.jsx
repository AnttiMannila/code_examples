import { useState } from 'react'

const AddBlog = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const newBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		})
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	return(
		<div>
			<h2>Add a new blog</h2>

			<form onSubmit={newBlog}>
				<div>
            Title
					<input
						id='title'
						value={newTitle}
						onChange={event => setNewTitle(event.target.value)}
						placeholder='add blog title'
					/>
				</div>
				<div>
            Author
					<input
						id='author'
						value={newAuthor}
						onChange={event => setNewAuthor(event.target.value)}
						placeholder='add author'
					/>
				</div>
				<div>
            Url
					<input
						id='url'
						value={newUrl}
						onChange={event => setNewUrl(event.target.value)}
						placeholder='add url(optional)'
					/>
				</div>
				<button id='add-button' type="submit">add</button>
			</form>
		</div>
	)

}
export default AddBlog