/// <reference types="Cypress" />

export default class resultSearchPage {
    clickfirstResult() {
        cy.get('.attachment-shop_catalog')
            .filter(':visible')
            .first()
            .click({ force: true });
    }

};