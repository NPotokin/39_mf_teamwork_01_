// TODO включить тест после полной реализации задачи SSR (вместе с route)
describe.skip('login page', () => {
  beforeEach(() => {
    cy.visit('/signin')
  })

  it('should show empty inputs', () => {
    cy.get('#login').should('be.empty')
    cy.get('#password').should('be.empty')
  })

  it('should fill inputs and show error', () => {
    cy.get('#login').type('mylogin')
    cy.get('#password').type('password')

    cy.get('form').submit()

    cy.get('#password_help').should(
      'have.text',
      'Must contain capital and number'
    )

    cy.get('#password').clear().type('Password1')

    cy.get('form').submit()
    cy.get('#password_help').should(
      'have.text',
      ''
    )
  })

  it('should navigate to sign up', () => {
    cy.contains('Sign Up').click()

    cy.location('pathname').should(
      'eq',
      '/signup'
    )
  })
})
