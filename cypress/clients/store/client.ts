import { ApiResponse } from '../types';
import { Inventory, Order } from './types';

const store = {
    deleteOrder: (orderId: Order['id']): Cypress.Chainable<Cypress.Response<ApiResponse | Order>> =>
        cy.request({ method: 'DELETE', url: `/store/order/${orderId}` }),
    getInventory: (): Cypress.Chainable<Cypress.Response<ApiResponse | Inventory>> =>
        cy.request({ method: 'GET', url: '/store/inventory' }),
    getOrder: (orderId: Order['id']): Cypress.Chainable<Cypress.Response<ApiResponse | Order>> =>
        cy.request({ failOnStatusCode: false, method: 'GET', url: `/store/order/${orderId}` }),
    placeOrder: (order: Order): Cypress.Chainable<Cypress.Response<ApiResponse | Order>> =>
        cy.request({ body: order, method: 'POST', url: '/store/order' }),
};

export default store;
