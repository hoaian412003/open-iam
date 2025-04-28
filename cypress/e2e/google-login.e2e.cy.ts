import { host } from "@/utils/host";

describe('template spec', () => {
  it('passes', () => {
    cy.visit(`${host}/client`);
    cy.get('button').contains('Signin').click().wait(1000);
    cy.get('button').contains('Continue with Google').click().wait(1000);
    cy.loginToGoogleWithTestAccount();
    cy.get('button').contains('Authorize').click().wait(1000);
  })
})
