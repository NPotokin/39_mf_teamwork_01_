describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('header', () => {
    it('should navigate to Forum page from header', () => {
      cy.get('header').contains('Forum page').click()
      cy.location('pathname').should('eq', '/forum')
    })

    it('should navigate to Leaderboard page from header', () => {
      cy.get('header').contains('Leaderboard').click()
      cy.location('pathname').should('eq', '/leaderboard')
    })

    it('should navigate to Profile page from header', () => {
      cy.get('header').contains('Profile').click()
      cy.location('pathname').should('eq', '/profile')
    })

    it('should navigate to Game page from header', () => {
      cy.get('header').contains('Play now').click()
      cy.location('pathname').should('eq', '/game')
    })

    it('should toggle theme button appearance', () => {
      cy.get('span[aria-label="moon"]').should('be.visible')
      cy.get('span[aria-label="moon"]').click()
      cy.get('span[aria-label="sun"]').should('be.visible')
    })
  })

  describe('page content', () => {
    it('Should navigate to Game page on Start Play button click', () => {
      cy.contains('Start Play').click()
      cy.location('pathname').should('eq', '/game')
    })

    it('Should navigate to Forum page on Join Us button click', () => {
      cy.get('a').contains('Join Us').click()
      cy.location('pathname').should('eq', '/forum')
    })
  })

  describe('footer', () => {
    it('should navigate to Forum page from footer', () => {
      cy.get('footer').contains('Forum page').click()
      cy.location('pathname').should('eq', '/forum')
    })

    it('should navigate to Leaderboard page from footer', () => {
      cy.get('footer').contains('Leaderboard').click()
      cy.location('pathname').should('eq', '/leaderboard')
    })

    it('should navigate to Profile page from footer', () => {
      cy.get('footer').contains('Profile').click()
      cy.location('pathname').should('eq', '/profile')
    })

    it('should navigate to Game page from footer', () => {
      cy.get('footer').contains('Game').click()
      cy.location('pathname').should('eq', '/game')
    })
  })
})
