describe('navigation', () => {
    const categoryUrls: Record<string, string> = {
        'Alerts, Frame & Windows': 'alertsWindows',
        'Book Store Application': 'books',
        Elements: 'elements',
        Forms: 'forms',
        Interactions: 'interaction',
        Widgets: 'widgets',
    };

    before(() => {
        cy.visit('/');
    });

    Object.keys(categoryUrls).forEach((category: string) => {
        it(`should go to URL /${categoryUrls[category]} when clicking the ${category} card`, () => {
            cy.clickCategory(category)
                .url()
                .should('equal', `${Cypress.config().baseUrl || ''}${categoryUrls[category]}`)
                .getElementListByCategory(category)
                .should('have.class', 'show')
                .goBackInHistory();
        });
    });
});
