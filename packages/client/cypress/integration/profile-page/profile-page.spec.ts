describe('profile page', () => {
  beforeEach(() => {
    cy.visit('/profile')
  })

  it('should show empty inputs', () => {
    cy.get('#name').should('be.empty')
    cy.get('#email').should('be.empty')
  })

  it('should fill inputs and show error', () => {
    cy.get('#name').type('myname')
    cy.get('#email').type('email')

    cy.get('form').submit()

    cy.get('#email_help').should(
      'have.text',
      'Invalid email'
    )
  })
})
