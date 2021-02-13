import { testUser } from '../../cypress-keys';

describe('My Trips page', () => {
  beforeEach(() => {
    sessionStorage.clear();
    cy.visit('/');
    cy.login();

    cy.get('button[data-tp-test="menu-bar-my-trips-btn"]').click();
  });

  afterEach(() => {
    cy.logout();
  });

  it('Should navigate to my trips page and check the page contents', () => {
    cy.url().should('eq', Cypress.config().baseUrl + 'mytrips');

    cy.get('tp-my-trips').should('exist');
    cy.get('.my-trips-container > h2').should('exist').should('contain', "Test user's trips");
    cy.get('.my-trips-container > .filters').should('exist');
    cy.get('[data-tp-test="my-trips-text-filter"]').should('exist');
    cy.get('[data-tp-test="my-trips-year-filter"]').should('exist');

    cy.get('[data-tp-test="my-trips-year-filter"]').click();
    cy.get('mat-option').should('have.length', testUser.trips.yearsWithTrips.length + 1);
    cy.get('mat-option:first-child').click();
    cy.get('mat-option').should('not.exist');

    cy.get('[data-tp-test="my-trips-future-only"]').should('exist');
    cy.get('tp-my-trips-list').should('exist');

    cy.get('tp-my-trips')
      .find('[data-tp-test="my-trips-list-item"]')
      .should('have.length', testUser.trips.numberOfFutureOnly);

    cy.get('.not-found').should('not.exist');
  });

  it('Should filter the results successfully', () => {
    cy.get('[data-tp-test="my-trips-future-only"]').click();
    cy.get('tp-my-trips')
      .find('[data-tp-test="my-trips-list-item"]')
      .should('have.length', testUser.numberOfTrips);

    cy.get('[data-tp-test="my-trips-text-filter"]').type('kor');
    cy.get('tp-my-trips')
      .find('[data-tp-test="my-trips-list-item"]')
      .should('have.length', testUser.trips.tripsToKorea);

    cy.get('[data-tp-test="my-trips-text-filter"]').clear();
    cy.get('tp-my-trips')
      .find('[data-tp-test="my-trips-list-item"]')
      .should('have.length', testUser.numberOfTrips);

    cy.get('[data-tp-test="my-trips-future-only"]').click();
    cy.get('tp-my-trips')
      .find('[data-tp-test="my-trips-list-item"]')
      .should('have.length', testUser.trips.numberOfFutureOnly);

    cy.get('[data-tp-test="my-trips-future-only"]').click();

    cy.get('[data-tp-test="my-trips-year-filter"]').click();
    cy.get('mat-option[ng-reflect-value="2019"]').click();
    cy.get('tp-my-trips').find('[data-tp-test="my-trips-list-item"]').should('have.length', 1);

    cy.get('[data-tp-test="my-trips-text-filter"]').type('asdasd');
    cy.get('tp-my-trips').find('[data-tp-test="my-trips-list-item"]').should('have.length', 0);
    cy.get('.not-found').should('exist');
  });

  it('Should open a trip item and open it in the planner', () => {
    cy.wait(500);
    cy.get('.mat-expansion-panel-content').should('not.be.visible');
    cy.get('[data-tp-test="my-trips-list-item"]:first-child').click();
    cy.get('.mat-expansion-panel-content').should('be.visible');

    cy.get('[data-tp-test="my-trips-list-item"]:first-child').within(() => {
      cy.get('.mat-expansion-panel-content').find('button').should('have.length', 4);
      cy.get('button:first-child').click();
    });

    cy.url().should('contain', Cypress.config().baseUrl + 'planner/');
  });

  it('Should open a trip item, click delete and be asked for confirmation', () => {
    cy.wait(500);
    cy.get('.mat-expansion-panel-content').should('not.be.visible');
    cy.get('[data-tp-test="my-trips-list-item"]:first-child').click();
    cy.get('.mat-expansion-panel-content').should('be.visible');

    cy.get('[data-tp-test="my-trips-list-item"]:first-child').within(() => {
      cy.get('[data-tp-test="my-trips-list-item-action-row"]').should('exist');
      cy.get('[data-tp-test="my-trips-list-item-delete-confirmation"]').should('not.exist');

      cy.get('.mat-expansion-panel-content').find('button').should('have.length', 4);
      cy.get('button:last-child').click();

      cy.get('[data-tp-test="my-trips-list-item-action-row"]').should('not.exist');
      cy.get('[data-tp-test="my-trips-list-item-delete-confirmation"]')
        .should('exist')
        .find('button')
        .should('have.length', 2);
    });
  });
});
