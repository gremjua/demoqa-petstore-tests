const clickCategory = (category: string): Cypress.Chainable => cy.contains(category).click();

export {};
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            clickCategory: typeof clickCategory;
        }
    }
}
Cypress.Commands.add('clickCategory', clickCategory);
