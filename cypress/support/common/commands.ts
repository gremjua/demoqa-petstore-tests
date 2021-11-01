const goBackInHistory = (): Cypress.Chainable => cy.window().then((window) => window.history.back());

const selectOptionByText = (option: string | string[]): Cypress.Chainable => {
    if (Array.isArray(option)) {
        Cypress._.forEach(option, (op) => cy.get('div[id*=react-select]').contains(op).click());
        return cy.wrap(option);
    }
    return cy.get('div[id*=react-select]').contains(option).click();
};

export {};
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            goBackInHistory: typeof goBackInHistory;
            selectOptionByText: typeof selectOptionByText;
        }
    }
}
Cypress.Commands.add('goBackInHistory', goBackInHistory);
Cypress.Commands.add('selectOptionByText', selectOptionByText);
