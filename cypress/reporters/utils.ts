/* eslint-disable */
import addContext from 'mochawesome/addContext';

/**
 * Add the screenshots that Cypress takes on failure to the test context so that they will be visible in the HTML
 * mochawesome reports. This must be used in the Cypress 'support' directory for custom commands:
 *
 * @example ```typescript
 * Cypress.on('test:after:run', (test, runnable) => {
 * addFailureScreenshotsToContext(test, runnable);
 * }
 * ```
 * @param {Cypress.ObjectLike} test - The test that was just executed
 * @param {Mocha.Test} runnable
 */
export const addFailureScreenshotsToContext = (test: Mocha.Runnable, runnable: Mocha.Test): void => {
    if (test.state === 'failed') {
        let item = runnable;
        const nameParts = [runnable.title];

        // Iterate through all parents and grab the titles
        while (item.parent) {
            nameParts.unshift(item.parent.title);
            const failedFromHook = (item as any).parent.hooks.find(
                (hook: any) => hook.hookId === (runnable as any).failedFromHookId
            );
            if (failedFromHook) {
                nameParts.push(failedFromHook.title.replace(':', '').replaceAll('"', ''));
            }
            item = item.parent as Mocha.Suite & Mocha.Test;
        }

        const fullTestName = nameParts.filter(Boolean).join(' -- '); // this is how cypress joins the test title fragments

        const imageUrl = `../../../screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`;

        const ctx = new Mocha.Context();
        ctx.test = test;
        addContext(ctx, imageUrl);
    }
};
