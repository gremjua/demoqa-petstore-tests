import { StudentData } from './types';

const getFirstAndLastName = (name: string): Array<string> => name.split(' ');
const getStateAndCity = (s: string): Array<string> => s.split(' ');

const fillInRegistrationForm = (data: StudentData): Cypress.Chainable => {
    const [firstName, lastName] = getFirstAndLastName(data['Student Name']);
    const [state, city] = getStateAndCity(data['State and City']);
    // eslint-disable-next-line cypress/no-force
    cy.get('#firstName')
        .type(firstName)
        .get('#lastName')
        .type(lastName)
        .get('#userEmail')
        .type(data['Student Email'])
        .get('#genterWrapper')
        .contains(data.Gender)
        .click()
        .get('#userNumber')
        .type(data.Mobile)
        // .get('#dateOfBirthInput')    Commented out because there is currently a bug when clearing date of birth field
        // .clear()
        // .type(data['Date of Birth'])
        .get('.subjects-auto-complete__value-container')
        .type(`${data.Subjects}{enter}`)
        .get('#hobbiesWrapper')
        .contains(data.Hobbies)
        .click()
        .get('#currentAddress')
        .type(data.Address)
        .get('#state')
        .click()
        .selectOptionByText(state)
        .get('#stateCity-wrapper')
        .contains('Select City')
        .click()
        .selectOptionByText(city);
    return cy.get('#submit').click();
};

const parseSubmittedData = (): Cypress.Chainable => {
    const parsedData: Record<string, string> = {};
    return cy.get('tbody tr').then((rows) => {
        Cypress._.forEach(rows, (row) => {
            const label = row.firstChild?.textContent;
            const value = row.lastChild?.textContent || '';
            if (!label) {
                throw new Error('Missing label of submitted form data.');
            } else {
                parsedData[label] = value;
            }
        });
        return parsedData;
    });
};

export {};
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            parseSubmittedData: typeof parseSubmittedData;
            fillInRegistrationForm: typeof fillInRegistrationForm;
        }
    }
}
Cypress.Commands.add('parseSubmittedData', parseSubmittedData);
Cypress.Commands.add('fillInRegistrationForm', fillInRegistrationForm);
