const host = Cypress.env('host');

describe('template spec', () => {
  it('passes', () => {

    console.log('ENV is: ------------', Cypress.env())

    cy.visit(`${host}/client`);
    // cy.get('button').contains('Signin').click().wait(1000);
    // cy.get('button').contains('Continue with Google').click().wait(1000);
    // cy.loginToGoogleWithTestAccount();
    // cy.get('button').contains('Authorize').click().wait(1000);
  })
})
