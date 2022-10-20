/// <reference types="Cypress" />

export default class mainNavbarPage {
    clickLogoutButton() {
        cy.get('[class ="pull-right list-inline acount"] > :nth-child(2) > a')
            .filter(':visible')
            .click({ force: true });
    }

    clickCartButton() {
        cy.get('[title="View your shopping cart"]')
            .filter(':visible')
            .click({ force: true });
    }

    clickViewCartButton() {
        cy.get('[class="button wc-forward view-cart"]')
            .filter(':visible')
            .click({ force: true });
    }

    getQuantityItemCart() {
        return cy.get('[class="mini-cart-items"]')
            .filter(':visible');
    }
};