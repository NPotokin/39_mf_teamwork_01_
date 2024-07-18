import {
  apiUrl,
  USER_DATA_KEY,
} from '../../support/config'

describe('profile page', () => {
  beforeEach(() => {
    cy.login()
    cy.getUser()
    cy.visit('/profile')
  })

  after(() => {
    cy.clearLocalStorage()
  })

  it('should display user data', () => {
    cy.url().should('include', '/profile')

    cy.get('[data-cy=user-login]').should(
      'have.text',
      'Login'
    )
    cy.get('[data-cy=user-email]').should(
      'have.text',
      'email@email.com'
    )
  })

  it('should open edit form and display fields', () => {
    cy.get('[data-cy=edit-profile]').click()
    cy.get('#login').should('have.value', 'Login')
    cy.get('#email').should(
      'have.value',
      'email@email.com'
    )
    cy.get('#first_name').should(
      'have.value',
      'Firstname'
    )
    cy.get('#login').clear().type('New Login')
    cy.get('#email')
      .clear()
      .type('newtestuser@example.com')
    cy.get('[data-cy=save-profile]').click()
    cy.fixture('userUpdated.json').then(
      userData => {
        cy.window().then(window => {
          window.localStorage.setItem(
            USER_DATA_KEY,
            JSON.stringify(userData)
          )
        })
      }
    )

    cy.reload()
    cy.get('[data-cy=user-login]').should(
      'have.text',
      'New Login'
    )
    cy.get('[data-cy=user-email]').should(
      'have.text',
      'newtestuser@example.com'
    )
  })

  it('should display error if form password is invalid', () => {
    cy.get('[data-cy=edit-password]').click()
    cy.get('#password').type('123passwordRR')
    cy.get('#confirm_password').type(
      '123password'
    )
    cy.get('[data-cy=save-profile]').click()
    cy.get('#confirm_password_help').should(
      'have.text',
      'Passwords do not match'
    )
    cy.get('#old_password_help').should(
      'have.text',
      'This field is required'
    )
    cy.get('#confirm_password')
      .clear()
      .type('123passwordRR')

    cy.get('#confirm_password_help').should(
      'have.text',
      ''
    )
  })
})
