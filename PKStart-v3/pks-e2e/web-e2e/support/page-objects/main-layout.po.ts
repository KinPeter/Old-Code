export const appBarPo = {
  appBar: () => cy.get('pk-app-bar'),
  pLogo: () => cy.get('mat-toolbar a[mattooltip="P-kin.com"]'),
  weatherBtn: () => cy.get('pk-app-bar-weather button'),
  koreanBtn: () => cy.get('pk-app-bar button[mattooltip="Korean"]'),
  notesBtn: () => cy.get('pk-app-bar button[mattooltip="Notes"]'),
  personalDataBtn: () => cy.get('pk-app-bar button[mattooltip="Personal data"]'),
  birthdaysBtn: () => cy.get('pk-app-bar button[mattooltip="Birthdays"]'),
  mouseProfilesBtn: () => cy.get('pk-app-bar button[mattooltip="Mouse profiles"]'),
  moreBtn: () => cy.get('pk-app-bar button[mattooltip="More..."]'),
  notificationsBtn: () => cy.get('pk-notifications button'),
  notificationsMenu: () => cy.get('.mat-menu-panel.pk-notifications'),
  notificationItem: () => cy.get('.mat-menu-content .pk-notifications__item'),
  notificationsClearBtn: () => cy.get('.mat-menu-content button.pk-notifications__clear-btn'),
  snackbar: () => cy.get('snack-bar-container.pk-snackbar'),
  snackbarCloseBtn: () => cy.get('pk-snackbar button'),
  moreMenu: () => cy.get('.app-bar__more-menu'),
  moreMenuButtons: () => cy.get('.app-bar__more-menu button'),
  moreMenuBtn: (i: number) => cy.get('.app-bar__more-menu button').eq(i),
}
