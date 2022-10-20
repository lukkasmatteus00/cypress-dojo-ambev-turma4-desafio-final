/// <reference types="Cypress" />

export default class cartPage {
    clickToRemoveAllItems() {
        const xpath = '[class="product-remove"] > [class="remove"]';
        cy.get(xpath)
            .filter(':visible')
            // Tentar descobrir pq não funcionou com o uso do .each
            .then(($iconRemove) => {
                for (let index = 1; index <= $iconRemove.length; index++) {
                    //como buscará de novo o elemento sempre deve buscar o primeiro
                    cy.get(xpath).filter(':visible')
                        .first()
                        .click({ force: true });
                }
            });
    }

    assertContainsProductInsideCart(value) {
        cy.get('tbody')
            .filter(':visible')
            .contains('[data-title="Product"]', value)
            .should('be.visible');
    }

    assertQuantityItemsInsideCart(value) {
        cy.get('[data-title="Product"]')
            .filter(':visible')
            .should('have.length', value);
    }

    assertDiscount(name, discount) {
        let subTotal = 0, total = 0;
        cy.get(`[data-title="Cupom: ${name}"]`)
            .filter(':visible')
            .should('contain', '-R$');

        cy.get(`[data-title="Cupom: ${name}"]`)
            .filter(':visible')
            .then(txt => {
                const _value = txt.text();
                const discountApplied = _value.replace('-R$', '')
                    .replace('.', '')
                    .replace(',', '.');

                cy.get('[data-title="Subtotal"]')
                    .filter(':visible')
                    .then(txt => {
                        const _value = txt.text();
                        subTotal = _value.replace('R$', '')
                            .replace('.', '')
                            .replace(',', '.');

                        cy.get('[data-title="Total"')
                            .filter(':visible')
                            .then(txt => {
                                const _value = txt.text();
                                total = _value.replace('R$', '')
                                    .replace('.', '')
                                    .replace(',', '.');
                            });
                        cy.log(parseFloat(subTotal))
                        const discountToBeApplied = (parseFloat(subTotal) * discount) / 100;

                        expect(discountToBeApplied).to.be.equal(parseFloat(discountApplied));
                        expect(parseFloat(subTotal) - discountToBeApplied).to.be.equal(parseFloat(total));
                    });
            });
    }

    assertSubTotal(value) {
        cy.get('[data-title="Subtotal"]')
            .filter(':visible')
            .then(txt => {
                const _value = txt.text();
                const newValue = _value.replace('R$', '')
                    .replace('.', '')
                    .replace(',', '.');
                expect(parseFloat(newValue)).to.be.lte(value);
            });
    }

    addCupom(vale) {
        cy.get('[id="coupon_code"')
            .filter(':visible')
            .clear()
            .type(vale);
    }

    clickApplyCupomButton() {
        cy.get('[name="apply_coupon"]')
            .filter(':visible')
            .click({ force: true });
    }

};