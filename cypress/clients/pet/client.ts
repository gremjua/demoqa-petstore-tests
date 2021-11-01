import { ApiResponse } from '../types';
import { PetData } from './types';

const pet = {
    add: (petData: PetData): Cypress.Chainable<Cypress.Response<ApiResponse | PetData>> =>
        cy.request({ body: petData, method: 'POST', url: '/pet' }),
    delete: (petId: PetData['id']): Cypress.Chainable<Cypress.Response<ApiResponse>> =>
        cy.request({ method: 'DELETE', url: `/pet/${petId}` }),
    get: (petId: PetData['id']): Cypress.Chainable<Cypress.Response<ApiResponse | PetData>> =>
        cy.request({ failOnStatusCode: false, method: 'GET', url: `/pet/${petId}` }),
    update: (petId: PetData['id'], updatedPetData: PetData): Cypress.Chainable<Cypress.Response<ApiResponse>> =>
        cy.request({ body: updatedPetData, method: 'PUT', url: `/pet/${petId}` }),
};

export default pet;
