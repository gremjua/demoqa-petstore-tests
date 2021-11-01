// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import './categories/commands';
import './leftPanel/commands';
import './common/commands';
import './categories/forms/commands';
import 'cypress-wait-until';
import { addFailureScreenshotsToContext } from 'reporters/utils';

Cypress.on('test:after:run', (test, runnable) => {
    // eslint-disable-next-line no-undef
    addFailureScreenshotsToContext(test as Mocha.Runnable, runnable);
});
