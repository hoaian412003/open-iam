
describe('Login with Google', { tags: ['@login', '@google'] }, () => {
  it('Full flow', () => {

    const host = Cypress.env('host');

    cy.visit(`${host}/client`);
    cy.get('button').contains('Signin').click().wait(1000);
    cy.get('button').contains('Continue with Google').click().wait(1000);
    cy.loginToGoogleWithTestAccount();
    cy.get('button').contains('Authorize').click().wait(1000);
  })
})
