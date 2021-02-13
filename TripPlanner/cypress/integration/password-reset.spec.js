describe('Password reset page', () => {
  beforeEach(() => {
    cy.visit('/reset-password/test@test.com/token');
  });

  it('Should check the validations on password inputs', () => {
    cy.url().should('contain', 'test@test.com').should('contain', 'token');

    cy.get('button.mat-raised-button').should('be.disabled');

    cy.get('mat-form-field:first-of-type input').type('asd').blur();
    cy.get('#mat-error-0').should('exist').should('contain', 'Must be at least');
    cy.get('#mat-error-1').should('exist').should('contain', 'do not match');

    cy.get('button.mat-raised-button').should('be.disabled');

    cy.get('mat-form-field:first-of-type input').clear().type('Asdasdasd123');
    cy.get('mat-form-field:last-of-type input').clear().type('asdas');
    cy.get('#mat-error-0').should('not.exist');
    cy.get('#mat-error-1').should('exist').should('contain', 'do not match');

    cy.get('button.mat-raised-button').should('be.disabled');

    cy.get('mat-form-field:first-of-type input').clear().type('Asdasdasd123');
    cy.get('mat-form-field:last-of-type input').clear().type('Asdasdasd123').blur();
    cy.get('#mat-error-0').should('not.exist');
    cy.get('#mat-error-1').should('not.exist');

    cy.get('button.mat-raised-button').should('not.be.disabled');
  });

  it('Should try to reset password with invalid token and fail', () => {
    cy.get('button.mat-raised-button').should('be.disabled');

    cy.get('mat-form-field:first-of-type input').clear().type('Asdasdasd123');
    cy.get('mat-form-field:last-of-type input').clear().type('Asdasdasd123').blur();
    cy.get('#mat-error-0').should('not.exist');
    cy.get('#mat-error-1').should('not.exist');

    cy.get('button.mat-raised-button').should('not.be.disabled').click();

    cy.url().should('eq', Cypress.config().baseUrl);

    cy.get('simple-snack-bar').should('exist').should('contain', 'ERROR');
  });
});
