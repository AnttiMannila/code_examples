const AddNotification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className="done">
			{message}
		</div>
	)
}

export default AddNotification