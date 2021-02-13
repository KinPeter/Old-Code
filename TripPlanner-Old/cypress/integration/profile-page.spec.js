import { testUser } from '../../cypress-keys';

describe('Profile page', () => {
  beforeEach(() => {
    sessionStorage.clear();
    cy.visit('/');
    cy.login();
  });

  afterEach(() => {
    cy.logout();
  });

  it('Should navigate to profile page and check the page contents', () => {
    cy.get('button[data-tp-test="menu-bar-my-profile-btn"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + 'profile');

    cy.get('tp-profile').should('exist');
    cy.get('tp-profile header h2').should('exist').should('contain', "Test user's profile");

    cy.get('section.profile-info')
      .should('exist')
      .within(() => {
        cy.get('p:first-child').should('contain', testUser.memberSince);
        cy.get('p:last-child').should('contain', testUser.numberOfTrips);
      });

    cy.get('section.pic-name-url')
      .should('exist')
      .within(() => {
        cy.get('.profile-pic img').should('have.attr', 'src', testUser.photoUrl);
        cy.get('.mat-form-field:nth-of-type(1) input').should('have.value', testUser.displayName);
        cy.get('.mat-form-field:nth-of-type(2) input').should('have.value', testUser.photoUrl);
      });

    cy.get('section.settings').should('exist');
    cy.get('section.settings mat-select')
      .as('select')
      .should('contain', testUser.preferredDateFormatText)
      .click();
    cy.get('mat-option').should('have.length', 6);
    cy.get(`mat-option[ng-reflect-value = "${testUser.preferredDateFormat}"]`).should(
      'have.class',
      'mat-selected',
    );
    cy.get('@select').type('{esc}');

    cy.get('section.change-password')
      .should('exist')
      .within(() => {
        cy.get('.mat-form-field:nth-of-type(1) input').should('not.have.value');
        cy.get('.mat-form-field:nth-of-type(2) input').should('not.have.value');
      });

    cy.get('section.delete-account')
      .should('exist')
      .within(() => {
        cy.get('button').should('exist').get('span').should('have.text', ' DELETE MY ACCOUNT ');
      });
  });

  it('Should navigate to profile page and check validations', () => {
    cy.get('button[data-tp-test="menu-bar-my-profile-btn"]').click();

    cy.get('mat-select').as('select').click();
    cy.get('mat-option').as('options').should('have.length', 6);
    cy.get(`mat-option[ng-reflect-value = "${testUser.preferredDateFormat}"]`)
      .as('originalOption')
      .should('exist');
    cy.get(`mat-option[ng-reflect-value = "dd MMM yyyy"]`).as('changedOption').should('exist');
    cy.get('@select').type('{esc}');

    cy.url().should('eq', Cypress.config().baseUrl + 'profile');

    cy.get('tp-profile')
      .should('exist')
      .within(() => {
        cy.get('button[mattooltip = "Save Changes"]').as('saveBtn').should('be.disabled');

        cy.get('section.pic-name-url')
          .should('exist')
          .within(() => {
            cy.get('.mat-form-field:nth-of-type(1) input').as('nameInput').clear().blur();
            cy.get('mat-error').should('exist').should('contain', 'must not be empty');
            cy.get('@saveBtn').should('be.disabled');

            cy.get('@nameInput').type('An').blur();
            cy.get('mat-error').should('exist').should('contain', 'must be between');
            cy.get('@saveBtn').should('be.disabled');

            cy.get('@nameInput').type('other Test').blur();
            cy.get('mat-error').should('not.exist');
            cy.get('@saveBtn').should('be.enabled');

            cy.get('@nameInput').clear().type(testUser.displayName).blur();
            cy.get('mat-error').should('not.exist');
            cy.get('@saveBtn').should('be.disabled');

            cy.get('.mat-form-field:nth-of-type(2) input').as('urlInput').clear().blur();
            cy.get('mat-error').should('not.exist');
            cy.get('@saveBtn').should('be.enabled');

            cy.get('@urlInput').clear().type(testUser.photoUrl).blur();
            cy.get('mat-error').should('not.exist');
            cy.get('@saveBtn').should('be.disabled');
          });

        cy.get('@select').click();
        cy.get('@options').should('have.length', 6);
        cy.get('@select').type('{esc}');
        cy.get('@saveBtn').should('be.disabled');

        cy.get('@select').click();
        cy.get('@changedOption').click();
        cy.get('@saveBtn').should('be.enabled');

        cy.get('@select').click();
        cy.get('@originalOption').click();
        cy.get('@saveBtn').should('be.disabled');

        cy.get('section.change-password')
          .should('exist')
          .within(() => {
            cy.get('.mat-form-field:nth-of-type(1) input').as('passInput').focus().blur();
            cy.get('mat-error').should('not.exist');
            cy.get('.mat-form-field:nth-of-type(2) input').as('confInput').focus().blur();
            cy.get('mat-error').should('not.exist');

            cy.get('@passInput').type('asd').blur();
            cy.get('mat-error')
              .should('have.length', 2)
              .first()
              .should('contain', 'must be at least');
            cy.get('mat-error').eq(1).should('contain', 'do not match');
            cy.get('@saveBtn').should('be.disabled');

            cy.get('@passInput').type('asd').blur();
            cy.get('mat-error').should('have.length', 1).should('contain', 'do not match');
            cy.get('@saveBtn').should('be.disabled');

            cy.get('@confInput').type('asdasd').blur();
            cy.get('mat-error').should('have.length', 0);
            cy.get('@saveBtn').should('be.enabled');

            cy.get('@passInput').clear();
            cy.get('@confInput').clear().blur();
            cy.get('mat-error').should('have.length', 0);
            cy.get('@saveBtn').should('be.disabled');
          });
      });
  });
});
