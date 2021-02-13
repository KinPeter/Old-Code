export const getNthSignupInput = n => {
  return cy.get(`tp-signup-form form mat-form-field:nth-child(${n}) input`);
};

export const getNthSignupInputError = n => {
  return cy.get(`tp-signup-form form mat-form-field:nth-child(${n}) mat-error`);
};
