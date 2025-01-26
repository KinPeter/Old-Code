import { mouseProfilesPo as po } from '../support/page-objects/mouse-profiles.po'
import { appBarPo } from '../support/page-objects/main-layout.po'

describe('Mouse profiles', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Should inform the user that the service is not available', () => {
    appBarPo.mouseProfilesBtn().click()
    po.box().should('be.visible').should('contain', 'service is not available.')
    po.actions().should('have.length', 2)
    po.syncBtn().should('be.enabled')
    appBarPo
      .snackbar()
      .should('be.visible')
      .should('have.class', 'error')
      .should('contain', 'Could not fetch')
  })
})
