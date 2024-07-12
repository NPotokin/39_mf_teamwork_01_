describe('sign-up page', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should show empty inputs', () => {
    cy.get('#first_name').should('be.empty')
    cy.get('#second_name').should('be.empty')
    cy.get('#login').should('be.empty')
    cy.get('#email').should('be.empty')
    cy.get('#phone').should('be.empty')
    cy.get('#password').should('be.empty')
    cy.get('#confirmPassword').should('be.empty')
  })

  it('should fill inputs and show confirm password error', () => {
    cy.get('#first_name').type('Firstname')
    cy.get('#second_name').type('Seconname')
    cy.get('#login').type('Login')
    cy.get('#email').type('email@email.com')
    cy.get('#phone').type('+79991231212')
    cy.get('#password').type('123passwordR')
    cy.get('#confirmPassword').type('123password')

    cy.get('form').submit()

    cy.get('#confirmPassword_help').should(
      'have.text',
      'Passwords do not match'
    )

    cy.get('#confirmPassword')
      .clear()
      .type('123passwordR')

    cy.get('form').submit()
    cy.get('#confirmPassword_help').should(
      'have.text',
      ''
    )
  })

  it('should navigate to sign in', () => {
    cy.contains('Sign In').click()

    cy.location('pathname').should(
      'eq',
      '/signin'
    )
  })
})
