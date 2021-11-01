describe('widgets category', () => {
    describe('select menu', () => {
        it('should allow a user to select all fields', () => {
            const withOptGroupOption = 'Group 1, option 1';
            const selectOneOption = 'Mr.';
            const oldSelectOption = 'Yellow';
            const multiSelectOptions = ['Black', 'Green'];
            const oldMultiSelectOption = 'Volvo';
            cy.visit('/select-menu')
                .get('#withOptGroup')
                .click()
                .selectOptionByText(withOptGroupOption)
                .get('#selectOne')
                .click()
                .selectOptionByText(selectOneOption)
                .get('#oldSelectMenu')
                .select(oldSelectOption);

            cy.contains('Select...').click().selectOptionByText(multiSelectOptions);
            cy.get('#cars').select(oldMultiSelectOption);
        });
    });
});
