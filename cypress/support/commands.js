
import LoginPage from '../support/pages/login.page';
import MainNavbar from '../support/pages/mainNavbar.page';
import Cart from '../support/pages/cart.page';
import Product from '../support/pages/product.page';

const loginPage = new LoginPage();
const mainNavbar = new MainNavbar();
const cart = new Cart();
const product = new Product();

const faker = require('faker-br');

Cypress.Commands.add("login", (email, password) => {

  loginPage.addLogin(email);
  loginPage.addPassword(password);
  loginPage.clickLoginButton();
});

Cypress.Commands.add("removeItemsFromCart", () => {
  mainNavbar.getQuantityItemCart().then(quantity => {
    if (Number(quantity.text()) > 0) {
      mainNavbar.clickCartButton();
      mainNavbar.clickViewCartButton();

      cart.clickToRemoveAllItems();
    }
  });
});

Cypress.Commands.add("addProductIntoCart", (size, color, quantity = 1) => {
  product.clickSizeOrColorButton(size);
  product.clickSizeOrColorButton(color);
  product.addQuantity(quantity);

  product.clickBuyButton();
});

Cypress.Commands.add("createCupom", (discount) => {
  const cupom = faker.name.firstName();
  cy.request({
    method: "POST",
    url: "/wp-json/wc/v3/coupons",
    headers: {
      authorization: Cypress.env().access_token,
    },
    body: {
      code: `cupom_${cupom}`,
      amount: discount,
      discount_type: "fixed_product",
      description: `Cupom de desconto de teste - ${cupom}`
    }
  }).then((response) => {
    const { status, body: { code } } = response;
    return code;
  });
});