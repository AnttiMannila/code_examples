const dummy = (blogs) => {
	let one = 0
	if (blogs) {
		one = 1
	}
	return one
}

const totalLikes = (blogs) => {
	let totalLikes = 0
	for (let i = 0; i < blogs.length; i++) {
		totalLikes = totalLikes + blogs[i].likes
	}
	return totalLikes
}

const favoriteBlog = (blogs) => {
	let mostLikes = {
		likes : 0,
	}

	if (blogs.length > 0) {
		for (let i = 0; i < blogs.length; i++) {
			if (blogs[i].likes > mostLikes.likes) {
				mostLikes = blogs[i]
			}
		}
		return mostLikes
	} else {
		return('List is empty')
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
}