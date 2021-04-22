const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Home', () => {
  it('should render create account modal when user click on cta create account button', () => {
    cy.visit(APP_URL)
    cy.get('#cta-create-account-button').click()
    cy.get('#modal-create-account')
  })

  it('should render create account modal when user click on header create account button', () => {
    cy.visit(APP_URL)
    cy.get('#create-account-button').click()
    cy.get('#modal-create-account')
  })

  it('should render login modal when user click on header login button', () => {
    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.get('#modal-login')
  })

  it('should login with a valid email and password', () => {
    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.get('#modal-login')

    cy.get('#login-email').type('igor@igor.me')
    cy.get('#login-password').type('1234')
    cy.get('#login-button span').click()

    cy.url().should('include', '/feedbacks')
  })

  it('should give an error when type an invalid email', () => {
    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.get('#modal-login')

    cy.get('#login-email').type('igor@')
    cy.get('#login-password').type('1234')
    cy.get('#login-button span').click()

    cy.get('#email-error')
  })

  it('should give an error when type an invalid password', () => {
    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.get('#modal-login')

    cy.get('#login-email').type('igor@igor.me')
    cy.get('#login-password').type('12')
    cy.get('#login-button span').click()

    cy.get('#password-error')
  })

  it('should make logout correctly', () => {
    cy.visit(APP_URL)
    cy.get('#login-button').click()
    cy.get('#modal-login')

    cy.get('#login-email').type('igor@igor.me')
    cy.get('#login-password').type('1234')
    cy.get('#login-button span').click()

    cy.url().should('include', '/feedbacks')

    cy.get('.loggout-button').click()
    cy.url().should('equal', `${APP_URL}/`)
  })
})
