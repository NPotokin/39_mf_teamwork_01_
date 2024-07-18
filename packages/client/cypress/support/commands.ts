/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import {
  apiUrl,
  AUTH_KEY,
  USER_DATA_KEY,
} from './config'

Cypress.Commands.add(
  'login',
  (login, password) => {
    cy.intercept(
      'POST',
      `${apiUrl}/auth/signin`,
      req => {
        expect(req.body).to.include({
          login: login,
          password: password,
        })

        req.reply({
          statusCode: 200,
          body: 'OK',
        })
      }
    ).as('login')

    cy.visit('/signin')
    cy.get('input[name="login"]').type(login)
    cy.get('input[name="password"]').type(
      password
    )
    cy.get('button[type="submit"]').click()
    cy.wait('@login').then(() => {
      cy.window().then(window => {
        window.localStorage.setItem(
          AUTH_KEY,
          'true'
        )
      })
    })
  }
)

Cypress.Commands.add(
  'getUserAndVisitPage',
  page => {
    cy.intercept('GET', `${apiUrl}/auth/user`, {
      fixture: 'user.json',
    }).as('getUser')
    cy.window().then(window => {
      cy.visit(page)
      cy.reload()
      cy.wait('@getUser').then(() => {
        cy.window().then(window => {
          window.localStorage.setItem(
            USER_DATA_KEY,
            JSON.stringify({
              fixture: 'user.json',
            })
          )
        })
      })
    })
    cy.window().then(window => {
      window.localStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify({
          fixture: 'user.json',
        })
      )
    })
  }
)

Cypress.Commands.add('getUser', () => {
  cy.intercept('GET', `${apiUrl}/auth/user`, {
    fixture: 'user.json',
  }).as('getUser')
})

Cypress.Commands.add(
  'signup',
  (
    login,
    password,
    first_name,
    second_name,
    email,
    phone
  ) => {
    cy.intercept(
      'POST',
      `${apiUrl}/auth/signup`,
      req => {
        expect(req.body).to.include({
          login,
          password,
          first_name,
          second_name,
          email,
          phone,
        })

        req.reply({
          statusCode: 201,
          body: 'User created',
        })
      }
    ).as('signup')

    cy.visit('/signup')
    cy.get('input[name="login"]').type(login)
    cy.get('input[name="password"]').type(
      password
    )
    cy.get('button[type="submit"]').click()
    cy.wait('@signup')
  }
)
