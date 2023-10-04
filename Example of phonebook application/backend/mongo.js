/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('you need a password, write it after mongo.js')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://anttimannila:${password}@ac-xkoqi1d-shard-00-00.5sgad2z.mongodb.net:27017,ac-xkoqi1d-shard-00-01.5sgad2z.mongodb.net:27017,ac-xkoqi1d-shard-00-02.5sgad2z.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-uex260-shard-0&authSource=admin&retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Contacts', personSchema)
if (process.argv.length === 3) {
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}

if (process.argv.length > 3) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(result => {
		console.log('contact saved to database!')
		mongoose.connection.close()
	})
}