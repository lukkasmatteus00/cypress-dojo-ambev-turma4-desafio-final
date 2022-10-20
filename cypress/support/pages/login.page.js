/// <reference types="Cypress" />

export default class loginPage {
    addLogin(login) {
        cy.get('[id="username"]')
            .filter(':visible')
            .type(login);
    }

    addPassword(password) {
        cy.get('[id="password"]')
            .filter(':visible')
            .type(password);
    }

    clickLoginButton() {
        cy.get('[name="login"]')
            .filter(':visible')
            .click({ force: true });
    }

};