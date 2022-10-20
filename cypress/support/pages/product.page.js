/// <reference types="Cypress" />

export default class productPage {
    clickSizeOrColorButton(sizeColor) {
        cy.get(`.button-variable-item-${sizeColor}`)
            .filter(':visible')
            .click({ force: true });
    }

    clickBuyButton() {
        cy.get('.single_add_to_cart_button')
            .filter(':visible')
            .click({ force: true });
    }

    clickPlusItemButton() {
        cy.get('.plus')
            .filter(':visible')
            .click({ force: true });
    }

    clickMinusItemButton() {
        cy.get('.minus')
            .filter(':visible')
            .click({ force: true });
    }

    addQuantity(vale) {
        cy.get('[type="number"]')
            .filter(':visible')
            .clear()
            .type(vale);
    }
};