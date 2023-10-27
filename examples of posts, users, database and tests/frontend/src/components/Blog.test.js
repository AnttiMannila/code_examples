import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'Never ending Full Stack course',
		author: 'Random Student',
		url: 'testing.com',
		likes: 0,
		user: {
			name: 'testeri',
			username: 'testeri'
		}
	}

	const user = {
		name: 'testeri',
		username: 'testeri'
	}

	const { container } = render(<Blog blog={blog} user={user} />)
	const div = container.querySelector('.blog')
	expect(div).toHaveTextContent(
		'Never ending Full Stack course'
	)
})


test('renders content', async () => {
	const blog = {
		title: 'Never ending Full Stack course2',
		author: 'Random Student2',
		url: 'testing.com',
		likes: 12,
		user: {
			name: 'testeri'
		}
	}

	const AppUser = {
		name: 'testeri',
		username: 'testeri'
	}

	const user = userEvent.setup()
	const { container } = render(<Blog blog={blog} user={AppUser} />)
	const div = container.querySelector('.blog')

	const button = screen.getByText('show')
	await user.click(button)
	expect(div).toHaveTextContent(
		'Never ending Full Stack course2' &&
		'Random Studen2' &&
		'testing.com'
	)
})



test('clicking the likebutton twice calls event handler twice', async () => {
	const blog = {
		title: 'Never ending Full Stack course3',
		author: 'Random Student3',
		url: 'testing.com',
		likes: 11,
		user: {
			name: 'testeri'
		}
	}

	const AppUser = {
		name: 'testeri',
		username: 'testeri'
	}

	const mockHandler = jest.fn()
	render(
		<Blog blog={blog} handleLike={mockHandler} user={AppUser} />
	)
	const user = userEvent.setup()

	const button = screen.getByText('show')
	await user.click(button)
	const likeButton = screen.getByText('like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})