/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(
      email: string,
      password: string
    ): Chainable<void>
    getUser(): Chainable<void>
    getUserAndVisitPage(page): Chainable<void>
    signup(
      login: string,
      first_name: string,
      second_name: string,
      email: string,
      password: string,
      phone: string
    ): Chainable<void>
  }
}
