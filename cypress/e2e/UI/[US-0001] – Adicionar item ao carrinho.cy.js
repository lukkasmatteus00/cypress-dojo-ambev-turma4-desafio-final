/// <reference types="cypress" />

import MainNavbar from '../../support/pages/mainNavbar.page';
import MainMenu from '../../support/pages/mainMenu.page';
import Cart from '../../support/pages/cart.page';

const mainNavbar = new MainNavbar();
const mainMenu = new MainMenu();

const cart = new Cart();

let products = [];

describe('Funcionalidade Carrinho:', () => {
    before(function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })

        cy.fixture("products").then((prod) => {
            products = prod;
        })
    })
    beforeEach(() => {
        cy.visit('/minha-conta/');

        cy.fixture("user").then((user) => {
            const { email, password } = user;
            cy.login(email, password);
        })
        cy.removeItemsFromCart();
    });

    afterEach(() => {
        mainNavbar.clickLogoutButton();
    });
    it('Deve ser adicionado 3 item diferentes com sucesso no carrinho', function () {
        for (const search of products) {
            const { name, size, color } = search;
            mainMenu.addSearch(name);

            cy.addProductIntoCart(size, color);
        }
        mainNavbar.clickCartButton();
        mainNavbar.clickViewCartButton();

        for (const { name } of products) {
            cart.assertContainsProductInsideCart(name);
        }
        cart.assertQuantityItemsInsideCart(3);

    });

    it('Não deve ser permitido inserir mais de 10 itens do mesmo produto ao carrinho', function () {
        const { name, size, color } = products[0];
        mainMenu.addSearch(name);
        cy.addProductIntoCart(size, color, 11);

        mainNavbar.clickCartButton();
        mainNavbar.clickViewCartButton();
        cart.assertQuantityItemsInsideCart(0);
    });

    it('Não deve ultrapassar de R$990,00 o valor total do pedido', () => {
        for (const search of products) {
            const { name, size, color } = search;
            mainMenu.addSearch(name);
            cy.addProductIntoCart(size, color, 30);
        }

        mainNavbar.clickCartButton();
        mainNavbar.clickViewCartButton();
        cart.assertSubTotal(990.00);
    });

    it('Deve ser aplicado o cupom de 10% em compras de R$200 e R$600', () => {
        for (const search of products) {
            const { name, size, color } = search;
            mainMenu.addSearch(name);

            cy.addProductIntoCart(size, color, 3);
        }

        mainNavbar.clickCartButton();
        mainNavbar.clickViewCartButton();
        cy.createCupom('10').then(code => {
            cart.addCupom(code);
            cart.clickApplyCupomButton();

            cart.assertDiscount(code, 10);
        })

    });

    it('Deve ser aplicado o cupom de 15% em compras acima de R$600', () => {
        for (const search of products) {
            const { name, size, color } = search;
            mainMenu.addSearch(name);

            cy.addProductIntoCart(size, color, 4);
        }

        mainNavbar.clickCartButton();
        mainNavbar.clickViewCartButton();
        cy.createCupom('15').then(code => {
            cart.addCupom(code);
            cart.clickApplyCupomButton();

            cart.assertDiscount(code, 15);
        })
    });

});
