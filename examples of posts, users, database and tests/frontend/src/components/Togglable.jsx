import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})
	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel1}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>{props.buttonLabel2}</button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Toggtable'

Togglable.propTypes = {
	buttonLabel1: PropTypes.string.isRequired,
	buttonLabel2: PropTypes.string.isRequired
}

export default Togglable