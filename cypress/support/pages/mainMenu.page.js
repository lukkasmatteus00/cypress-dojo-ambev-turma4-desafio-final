/// <reference types="Cypress" />

export default class mainMenuPage {
    clickBuyButton() {
        cy.get('#primary-menu > .menu-item-629 .icon-earphones-alt')
            .filter(':visible')
            .click({ force: true });
    }

    addSearch(value) {
        cy.get('[placeholder="Enter your search ..."]')
            .filter(':visible')
            .type(value)
            .type('{enter}');
    }
};