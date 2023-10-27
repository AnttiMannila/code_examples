describe('Blog App ', function() {
	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		cy.visit('')
		const user = {
			name: 'Cypress Tester',
			username: 'Cypress',
			password: 'cypress1'
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		const user2 = {
			name: 'Cypress Tester2',
			username: 'Cypress2',
			password: 'cypress2'
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
	})

	it('Login form id shown', function() {
		cy.contains('Login to blog application')
		cy.contains('username')
		cy.contains('password')
		cy.contains('login')
	})
	describe('Login', function(){
		it('user can login', function() {
			cy.get('#username').type('Cypress')
			cy.get('#password').type('cypress1')
			cy.get('#login-button').click()
			cy.contains('Blog application')
			cy.contains('Cypress Tester logged in')
		})

		it('login fails with wrong password', function() {
			cy.get('#username').type('testi')
			cy.get('#password').type('juujuu')
			cy.get('#login-button').click()

			cy.get('.error').contains('wrong username or password')
		})
	})
	describe('when logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'Cypress', password: 'cypress1' })
			cy.createBlog({
				title: 'Never ending Full Stack course',
				author: 'Random Student',
				url: 'testing.com',
			})
			cy.createBlog({
				title: 'Turtles',
				author: 'Random Student2',
				url: 'testing.com',
			})
		})

		it('a new blog can be created', function() {
			cy.contains('add blog').click()
			cy.get('#title').type('cypress 101')
			cy.get('#author').type('cypress')
			cy.get('#url').type('newurl.com')
			cy.get('#add-button').click()
			cy.get('.blog').contains('cypress 101')
		})

		it('blog can be liked', function(){
			cy.get('.blog').contains('Turtles').parent().find('button').as('showButton')
				.get('@showButton').click()
				.get('#likeButton').click()
				.get('.blog').contains('likes: 1')
		})

		it('blog can be deleted', function(){
			cy.get('.blog').contains('Turtles').parent().find('button').as('showButton')
				.get('@showButton').click()
				.get('.deleteButton').click()
			cy.get('.error').should('contain','Turtles by Random Student2 deleted')
			cy.get('.blog').contains('Turtles').should('not.exist')

		})

		it('only the one who added blog, can see delete button', function(){
			cy.get('#logoutButton').click()
			cy.get('#username').type('Cypress2')
			cy.get('#password').type('cypress2')
			cy.get('#login-button').click()
			cy.get('.blog').contains('Turtles').parent().find('button').as('showButton')
				.get('@showButton').click()
				.get('.deleteButton').should('not.exist')
		})

		it('most likes is at the top', function(){
			cy.get('.blog').contains('Turtles').parent().find('button').as('showButton')
				.get('@showButton').click()
				.get('#likeButton').click()
			cy.get('.blog').contains('hide').click()
			cy.get('.blog').eq(0).should('contain', 'Turtles')
			cy.get('.blog').eq(1).should('contain', 'Never ending Full Stack course')

			cy.get('.blog').contains('Never ending Full Stack course').parent().find('button').as('showButton')
				.get('@showButton').click()
				.get('#likeButton').click()
				.get('#likeButton').click()

		})

	})
})