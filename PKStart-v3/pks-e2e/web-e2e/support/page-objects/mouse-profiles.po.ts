export const mouseProfilesPo = {
  box: () => cy.get('pk-mouse-profiles'),
  header: () => cy.get('pk-mouse-profiles header'),
  actions: () => cy.get('pk-mouse-profiles header .main-box-actions button'),
  closeBtn: () => cy.get('pk-mouse-profiles header button[mattooltip="Close"]'),
  syncBtn: () => cy.get('pk-mouse-profiles header button:first-child'),
}
