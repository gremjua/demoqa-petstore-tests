import pet from 'clients/pet/client';
import { PetData } from 'clients/pet/types';

describe('pet api', { baseUrl: 'https://petstore.swagger.io/v2' }, () => {
    it('should be able to create, read, update and delete', () => {
        const timestamp = Date.now();
        const petData: PetData = {
            category: { id: timestamp, name: 'newCategory' },
            id: timestamp,
            name: 'newPet',
            photoUrls: [''],
            status: 'available',
            tags: [{ id: timestamp, name: 'newTag' }],
        };
        const updatedName = 'UPDATEDName';
        pet.add(petData).then((response) => {
            expect(response.status).to.equal(200);
        });
        cy.waitUntil(
            () =>
                pet.get(petData.id).then((response) => {
                    if (response.status === 200) {
                        expect(response.body).to.deep.equal(petData);
                        return true;
                    }
                    return false;
                }),
            {
                errorMsg: 'Pet has not been stored in the data base yet.',
                interval: 1000,
                timeout: 5000,
            }
        );
        pet.update({ ...petData, name: updatedName }).then((response) => {
            expect(response.status).to.equal(200);
        });
        cy.waitUntil(
            () =>
                pet.get(petData.id).then((response) => {
                    if (response.status === 200 && (response.body as PetData).name === updatedName) {
                        expect(response.body).to.deep.equal({ ...petData, name: updatedName });
                        return true;
                    }
                    return false;
                }),
            {
                errorMsg: 'Pet has not been updated correctly.',
                interval: 1000,
                timeout: 5000,
            }
        );
        pet.delete(petData.id).then((response) => {
            expect(response.status).to.equal(200);
        });

        cy.waitUntil(() => pet.get(petData.id).then((response) => response.status === 404), {
            errorMsg: 'Pet has not been deleted correctly.',
            interval: 1000,
            timeout: 5000,
        });
    });
});
