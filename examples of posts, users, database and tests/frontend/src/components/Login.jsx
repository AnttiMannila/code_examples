import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setErrorMessage, setMessage }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setMessage(`${username} logged in`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
			setUsername('')
			setPassword('')
		} catch(expection) {
			setErrorMessage('wrong username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	return(
		<form onSubmit={handleLogin}>
			<div>
            username
				<input
					id='username'
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
            password
				<input
					id='password'
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id='login-button' type="submit">login</button>
		</form>
	)
}
export default Login