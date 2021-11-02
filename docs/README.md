demoqa-petstore-tests / [Exports](modules.md)

# DemoQA and PetStore Automated Tests

Web e2e automated tests for [demoqa.com](https://demoqa.com/).
API e2e automated tests for [petstore.swagger.io](https://petstore.swagger.io/#/).

Cypress was selected as the main tool for the framework due to its execution speed, simple use, and easiness in debugging. Different plugins provide support for diverse types of tests that could be done in addition to the current ones: visual testing, contract testing, UI performance testing, among others.

## First Time Set-Up

1. Clone the repo:
    ```sh
    git clone https://github.com/gremjua/demoqa-petstore-tests.git
    cd demoqa-petstore-tests
    ```
1. Install [NVM](https://github.com/nvm-sh/nvm). Then use NVM to get the supported Node version (v14.16.0) running:
    ```sh
    nvm use
    ```
    Or simply install the supported Node version [here](https://nodejs.org/dist/v14.16.0/).
1. Install dependencies running:
    ```sh
    npm i
    ```

## Running Tests

### Locally

```sh
npm run test-full
```

This will run all tests in a headless chrome browser and generate raw junit and mochawesome reports in the `cypress/reports` directory. See [Processing Reports](#processing-reports) to see how to merge reports and generate a nice HTML report.

### In CI/CD

The project is set up to run tests in a CircleCI job on every commit pushed. The configuration is currently set up to run all tests, generate and archive artifacts, and publish a mochawesome report to [Calliope.pro](calliope.pro). Look at [.circleci/config.yml](.circleci/config.yml) for more information.

You can review test jobs and run them in the project's [CircleCI dashboard](https://app.circleci.com/pipelines/github/gremjua/demoqa-petstore-tests).
Test reports, screenshots and videos can be seen in the `Artifacts` section of the CircleCI job. [Here's an example HTML report](https://7-423143444-gh.circle-artifacts.com/0/cypress/reports/mocha/output/output.html).

## Results

An example report uploaded to [Calliope.pro](calliope.pro) can be seen in [this link](https://app.calliope.pro/reports/105700/public/0a04c34a-d038-4f7e-9855-c2c08b492da5). A failure was forced to examine the behavior of the reporting tool.

### Processing Reports

After all tests run locally, several mochawesome files are generated. To merge them and create a nice HTML report, we need to run the following commands:

```sh
npm run report-merge
npm run report-html
```

This will generate an HTML report in `cypress/reports/mocha/output`.

## Scenarios

### Web Tests - DemoQA

[Specs](cypress/specs/ui)

1. **Navigation**: <br>Given a user navigates to demoqa.com<br>When a user selects a `category`<br>Then the user is taken to the corresponding `category` URL<br>and the corresponding `category` in the left panel is unfolded<br>and the corresponding menu list is visible.
1. **Forms**: <br>Given a user navigates to demoqa.com/forms<br>When a user fills out and submits the registration form<br>Then a pop-up appears showing the correct submitted data.
1. **Widgets**: <br>Given a user navigates to demoqa.com/select-menu<br>When a user selects values for all select menus<br>Then the page shows no errors.

#### Selection of Tests

Navigation is one of the most important elements of a website. In addition, it is a test scenario that can be time-consuming, and usually very repetitive, so it is a good automation candidate.

After analyzing the system under test, it was concluded that test scenarios involving filling out forms and selecting values from widgets would be the ones that consume the most time when being executed manually. Therefore, those test scenarios were selected to be automated as well.

Only the happy paths were added at first, but similar tests can be written to check for negative cases.

#### Bugs Found

In demoqa.com/forms, when erasing the date of birth field, the page will fail to compute the date and go blank.

### API Tests - PetStore

[Specs](cypress/specs/api)

1. **User CRUD**: <br>A user should be able to create a page user, read its data, update it and delete it.
1. **Order Creation and Deletion**: <br>A user should be able to create a purchase order, read it, and delete it.
1. **Pet CRUD**: <br>A user should be able to add a pet to the store, read its data, update it and delete it.

#### Selection of Tests

For the API test scenarios, the focus was given to the CRUD operations of the different entities. The highest priority is given to these operations because they make up the main flow of the application, that is, the main purpose. All users will repeatedly create page users, update their data, upload their pets' information, and make purchase orders.

## Next Steps

1. To make tests easier to run and more portable, add a Dockerfile based on a Cypress docker image, which will contain everything needed to execute tests. This will also make it easier for tests to run in other CI/CD tools such as Jenkins.
1. Add a CircleCI cron job that executes UI tests using Firefox and Edge on a nightly basis.
1. Fix typedoc to generate Markdown files with documentation of the testing commands used and the existing tests on every commit.
1. Add UI performance tests using a Google lighthouse Cypress plugin such as [cypress-audit](https://www.npmjs.com/package/cypress-audit).
1. Add contract tests using a Cypress plugin such as [cypress-swagger-validation](https://github.com/jc21/cypress-swagger-validation).
1. Add visual tests using a Cypress plugin such as [cypress-image-snapshot](https://www.npmjs.com/package/cypress-image-snapshot).
