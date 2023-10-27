import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddBlog from './AddBlog'
import userEvent from '@testing-library/user-event'


describe('<AddBlog /> works', () => {

	test('event handler works with right details', async () => {
		const createBlog = jest.fn()

		render(<AddBlog createBlog={createBlog} />)

		const titleInput = screen.getByPlaceholderText('add blog title')
		const authorInput = screen.getByPlaceholderText('add author')
		const urlInput = screen.getByPlaceholderText('add url(optional)')
		const saveButton = screen.getByText('add')

		const newBlog = {
			title: 'New blog',
			author: 'New author',
			url: 'New url'
		}
		await userEvent.type(titleInput, newBlog.title)
		await userEvent.type(authorInput, newBlog.author)
		await userEvent.type(urlInput, newBlog.url)

		await userEvent.click(saveButton)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
		expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
		expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
	})
})