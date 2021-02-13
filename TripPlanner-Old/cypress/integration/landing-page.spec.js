import { getNthSignupInput, getNthSignupInputError } from '../support/utils';
import { testUser } from '../../cypress-keys';

describe('Landing page', () => {
  beforeEach(() => {
    sessionStorage.clear();
    cy.visit('/');
  });

  it('Should check validations on signup form', () => {
    // display name
    getNthSignupInput(1).focus().blur();
    getNthSignupInputError(1).should('exist').should('contain', 'not be empty');
    getNthSignupInput(1).type('as').blur();
    getNthSignupInputError(1).should('exist').should('contain', 'must be between');
    getNthSignupInput(1).clear().type('test test').blur();
    getNthSignupInputError(1).should('not.exist');

    // email
    getNthSignupInput(2).focus().blur();
    getNthSignupInputError(2).should('exist').should('contain', 'not be empty');
    getNthSignupInput(2).type('as').blur();
    getNthSignupInputError(2).should('exist').should('contain', 'invalid');
    getNthSignupInput(2).clear().type('test@test.com').blur();
    getNthSignupInputError(2).should('not.exist');

    // password
    getNthSignupInput(3).focus().blur();
    getNthSignupInputError(3).should('exist').should('contain', 'not be empty');
    getNthSignupInput(3).type('as').blur();
    getNthSignupInputError(3).should('exist').should('contain', 'Must be at least');
    getNthSignupInput(3).clear().type('Asdasdasd123').blur();
    getNthSignupInputError(3).should('not.exist');

    // confirm password
    getNthSignupInput(4).focus().blur();
    getNthSignupInputError(4).should('exist').should('contain', 'not be empty');
    getNthSignupInput(4).type('as').blur();
    getNthSignupInputError(4).should('exist').should('contain', 'do not match');
    getNthSignupInput(4).clear().type('Asdasdasd123').blur();
    getNthSignupInputError(4).should('not.exist');
  });

  it('Should find the login button and open then close the dialog', () => {
    cy.get('tp-login-modal').should('not.exist');

    cy.get('button[mattooltip = "Log in"]').click();

    cy.get('tp-login-modal').should('exist');

    cy.get('tp-login-modal mat-card-actions button:first-child').click();

    cy.get('tp-login-modal').should('not.exist');
  });

  it('Should fail to log in and get ERROR snackbar', () => {
    cy.get('tp-login-modal').should('not.exist');

    cy.get('button[mattooltip = "Log in"]').click();

    cy.get('tp-login-modal').should('exist');

    cy.get('tp-login-modal input[name="email"]').type('blahblah@blah.bl');
    cy.get('tp-login-modal input[name="password"]').type('password');

    cy.get('tp-login-modal mat-card-actions button:last-child').click();

    cy.get('tp-login-modal').should('exist');

    cy.get('simple-snack-bar').should('exist').should('contain', 'ERROR');
  });

  it('Should log in and get greeted by name', () => {
    cy.get('tp-login-modal').should('not.exist');

    cy.get('button[mattooltip = "Log in"]').click();

    cy.get('tp-login-modal').should('exist');

    cy.get('tp-login-modal input[name="email"]').type(testUser.email);
    cy.get('tp-login-modal input[name="password"]').type(testUser.password);

    cy.get('tp-login-modal mat-card-actions button:last-child').click();

    cy.get('tp-login-modal').should('not.exist');

    cy.get('simple-snack-bar').should('exist').should('contain', 'Successfully');

    cy.get('.greeting h2')
      .should('exist')
      .should('contain', testUser.displayName)
      .should($h2 => {
        expect($h2.text()).not.to.match(/^,.+/);
      });
  });

  it('Should ask password reset email for a non existing account', () => {
    cy.get('tp-login-modal').should('not.exist');

    cy.get('button[mattooltip = "Log in"]').click();

    cy.get('tp-login-modal').should('exist');

    cy.get('tp-login-modal input[name="email"]').type('non.existing@email.com');

    cy.get('tp-login-modal p a').click();

    cy.get('tp-login-modal').should('not.exist');

    cy.get('simple-snack-bar').should('exist').should('contain', 'ERROR');
  });

  it('Should ask password reset email for a proper account', () => {
    cy.get('tp-login-modal').should('not.exist');

    cy.get('button[mattooltip = "Log in"]').click();

    cy.get('tp-login-modal').should('exist');

    cy.get('tp-login-modal input[name="email"]').type(testUser.email);

    cy.get('tp-login-modal p a').click();

    cy.get('tp-login-modal').should('not.exist');

    cy.get('simple-snack-bar').should('exist').should('contain', 'Please check your inbox');
  });
});
