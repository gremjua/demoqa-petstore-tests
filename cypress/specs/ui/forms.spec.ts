import { StudentData } from '../../commands/categories/forms/types';

describe('forms category', () => {
    const studentData: StudentData = {
        Address: 'Av. Fake 123',
        Gender: 'Male',
        Hobbies: 'Sports',
        Mobile: '1234567890',
        'State and City': 'NCR Delhi',
        'Student Email': 'john@doe.com',
        'Student Name': 'John Doe',
        Subjects: 'Maths',
    };
    it('should show a pop-up with submitted data when submitting the form', () => {
        cy.visit('/automation-practice-form')
            .fillInRegistrationForm(studentData)
            .parseSubmittedData()
            .should('deep.include', studentData);
    });
});
