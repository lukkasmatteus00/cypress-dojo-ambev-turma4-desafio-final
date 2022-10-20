/// <reference types="cypress"/>

const faker = require('faker-br');
describe('Funcionalidade API cupons:', () => {
    describe('[GET] :', () => {
        it('Deve retornar os cupons cadastrados', () => {
            cy.request({
                method: "GET",
                url: "/wp-json/wc/v3/coupons?order=desc",
                headers: {
                    authorization: Cypress.env().access_token,
                },
            }).then((response) => {
                const { status, body } = response;
                expect(status).to.equal(200);
                expect(body).to.be.not.empty;

                for (const cupom of body) {
                    expect(cupom).to.be.haveOwnProperty('amount');
                    expect(cupom).to.be.haveOwnProperty('code');
                    expect(cupom).to.be.haveOwnProperty('id');
                    expect(cupom).to.be.haveOwnProperty('discount_type');
                }
            });
        });

        it('Deve retornar somente o cupom que foi informando o id', () => {
            const _id = 7460;
            cy.request({
                method: "GET",
                url: `/wp-json/wc/v3/coupons/${_id}`,
                headers: {
                    authorization: Cypress.env().access_token,
                },
            }).then((response) => {
                const { status, body } = response;
                expect(status).to.equal(200);
                expect(body).to.be.not.empty;
                expect(body.amount).to.be.equal('10.00');
                expect(body.code).to.be.equal("coupon 9156");
                expect(body.discount_type).to.be.equal("fixed_product");
                expect(body.id).to.be.equal(_id);
                expect(body.description).to.be.equal("Cupom de desconto de teste");
            });
        });
    });
    describe('[POST] :', () => {
        const cupom = faker.name.firstName();
        let _id = '';

        after(function () {
            cy.request({
                method: "DELETE",
                url: `/wp-json/wc/v3/coupons/${_id}?force=true`,
                headers: {
                    authorization: Cypress.env().access_token,
                }
            }).then((response) => {
                const { status } = response;
                expect(status).to.equal(200);
            });
        });

        it('Deve ser permitido o cadastro de um novo cupom', function () {
            cy.request({
                method: "POST",
                url: "/wp-json/wc/v3/coupons",
                headers: {
                    authorization: Cypress.env().access_token,
                },
                body: {
                    code: `cupom_${cupom}`,
                    amount: "10",
                    discount_type: "fixed_product",
                    description: `Cupom de desconto de teste - ${cupom}`
                }
            }).then((response) => {
                const { status, body } = response;
                _id = body.id;
                expect(status).to.equal(201);
                expect(body).to.be.not.empty;
                expect(body.amount).to.be.equal('10.00');
                expect(body.code).to.be.equal(`cupom_${cupom}`.toLocaleLowerCase());
                expect(body.discount_type).to.be.equal("fixed_product");
                expect(body.description).to.be.equal(`Cupom de desconto de teste - ${cupom}`);
            });
        });

        it('Não deve ser permitido o cadastro um cupom com o mesmo valor de code', function () {
            cy.request({
                method: "POST",
                url: "/wp-json/wc/v3/coupons",
                headers: {
                    authorization: Cypress.env().access_token,
                },
                failOnStatusCode: false,
                body: {
                    code: `cupom_${cupom}`,
                    amount: "10",
                    discount_type: "fixed_product",
                    description: `Cupom de desconto de teste - ${cupom}`
                }
            }).then((response) => {
                const { status, body: { message } } = response;
                expect(status).to.equal(400);
                expect(message).to.be.equal('O código de cupom já existe');
            });
        });

        for (const body of [
            {
                missedField: "code",
                amount: "10",
                discount_type: "fixed_product",
                description: `Cupom de desconto de teste - ${cupom}`
            },
            {
                missedField: "amount",
                code: `cupom_${faker.name.firstName()}`,
                discount_type: "fixed_product",
                description: `Cupom de desconto de teste - ${cupom}`
            },
            {
                missedField: "discount_type",
                code: `cupom_${faker.name.firstName()}`,
                amount: "10",
                description: `Cupom de desconto de teste - ${cupom}`
            },
            {
                missedField: "description",
                code: `cupom_${faker.name.firstName()}`,
                amount: "10",
                discount_type: "fixed_product",
            }
        ]) {
            it(`Deve ser obrigario o campo ${body.missedField}`, function () {
                delete body.missedField;

                cy.request({
                    method: "POST",
                    url: "/wp-json/wc/v3/coupons",
                    headers: {
                        authorization: Cypress.env().access_token,
                    },
                    failOnStatusCode: false,
                    body: body
                }).then((response) => {
                    const { status, body: { message } } = response;
                    expect(status).to.equal(400);
                    expect(message).to.be.include('Parâmetro(s) ausente(s):');
                });
            });
        }
    });
});
