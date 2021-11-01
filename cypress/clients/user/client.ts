import { ApiResponse } from '../types';
import { UserData } from './types';

const user = {
    create: (userData: UserData): Cypress.Chainable<Cypress.Response<ApiResponse>> =>
        cy.request({ body: userData, method: 'POST', url: '/user' }),
    delete: (username: UserData['username']): Cypress.Chainable<Cypress.Response<ApiResponse>> =>
        cy.request({ method: 'DELETE', url: `/user/${username}` }),
    get: (username: UserData['username']): Cypress.Chainable<Cypress.Response<ApiResponse | UserData>> =>
        cy.request({ failOnStatusCode: false, method: 'GET', url: `/user/${username}` }),
    login: (userData: Pick<UserData, 'username' | 'password'>): Cypress.Chainable<Cypress.Response<ApiResponse>> =>
        cy.request({
            method: 'GET',
            url: `/user/login?username=${userData.username}&password=${userData.password}`,
        }),
    logout: (): Cypress.Chainable<Cypress.Response<ApiResponse>> =>
        cy.request({
            method: 'GET',
            url: '/user/logout',
        }),
    update: (
        username: UserData['username'],
        updatedUserData: UserData
    ): Cypress.Chainable<Cypress.Response<ApiResponse>> =>
        cy.request({ body: updatedUserData, method: 'PUT', url: `/user/${username}` }),
};

export default user;
