describe('Auth guard', () => {
  it('Should visit unauthorized pages and fail', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Cannot set property');
      // return false to prevent the error from failing this test
      return false;
    });

    cy.visit('/planner');
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.visit('/mytrips');
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl);
    cy.visit('/help');
    cy.url().should('eq', Cypress.config().baseUrl + 'help');
    cy.visit('/reset-password/test@test.com/token');
    cy.url().should('eq', Cypress.config().baseUrl + 'reset-password/test@test.com/token');
  });
});
