const getElementListByCategory = (category: string): Cypress.Chainable =>
    cy.get('.header-text').contains(category).closest('.element-group').get('.element-list');

export {};
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            getElementListByCategory: typeof getElementListByCategory;
        }
    }
}
Cypress.Commands.add('getElementListByCategory', getElementListByCategory);
