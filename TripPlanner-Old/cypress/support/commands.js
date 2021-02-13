// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { testUser } from '../../cypress-keys';

Cypress.Commands.add('login', () => {
  cy.get('tp-login-modal').should('not.exist');

  cy.get('button[data-tp-test="menu-bar-login-btn"]').click();

  cy.get('tp-login-modal').should('exist');

  cy.get('tp-login-modal input[name="email"]').type(testUser.email);
  cy.get('tp-login-modal input[name="password"]').type(testUser.password);

  cy.get('tp-login-modal mat-card-actions button:last-child').click();

  cy.get('tp-login-modal').should('not.exist');

  cy.get('simple-snack-bar').should('exist').should('contain', 'Successfully');
});

Cypress.Commands.add('logout', () => {
  cy.get('button[data-tp-test="menu-bar-logout-btn"]').click();

  cy.url().should('eq', 'http://localhost:4200/');

  cy.get('button[data-tp-test="menu-bar-login-btn"]').should('exist');
});
