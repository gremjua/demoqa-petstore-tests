import user from 'clients/user/client';
import { UserData } from 'clients/user/types';

describe('user', { baseUrl: 'https://petstore.swagger.io/v2' }, () => {
    it('should be able to create, read, update and delete', () => {
        const timestamp = Date.now();
        const userData: UserData = {
            email: 'test@test.com',
            firstName: 'test',
            id: timestamp,
            lastName: 'testLastName',
            password: 'test123',
            phone: '1234567890',
            userStatus: 0,
            username: `testuser${timestamp}`,
        };
        const updatedLastName = 'UPDATEDlastName';
        user.create(userData).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.code).to.equal(200);
        });
        cy.waitUntil<Cypress.Chainable<boolean>>(
            // wait for the user to be stored in the data base
            () =>
                user
                    .get(userData.username)
                    .then((response) => response.status === 200 && (response.body as UserData).id === userData.id),
            {
                errorMsg: 'User has not been stored in the data base yet.',
                interval: 1000,
                timeout: 5000,
            }
        );
        user.update(userData.username, { ...userData, lastName: updatedLastName }).then((response) => {
            expect(response.status).to.equal(200);
        });
        cy.waitUntil(
            // wait for the user to be stored in the data base
            () =>
                user
                    .get(userData.username)
                    .then(
                        (response) =>
                            response.status === 200 && (response.body as UserData).lastName === updatedLastName
                    ),
            {
                errorMsg: 'User has not been updated correctly.',
                interval: 1000,
                timeout: 5000,
            }
        );
        user.delete(userData.username).then((response) => {
            expect(response.status).to.equal(200);
        });

        cy.waitUntil(
            // wait for the user to be stored in the data base
            () => user.get(userData.username).then((response) => response.status === 404),
            {
                errorMsg: 'User has not been deleted correctly.',
                interval: 1000,
                timeout: 5000,
            }
        );
    });
});
