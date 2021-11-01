demoqa-petstore-tests / [Exports](modules.md)

# DemoQA and PetStore Automated Tests

Web e2e automated tests for [demoqa.com](https://demoqa.com/).
API e2e automated tests for [petstore.swagger.io](https://petstore.swagger.io/#/).

Cypress was selected as the main tool for the framework due to its execution speed, simple use, and easiness in debugging. Different plugins provide support for diverse types of tests that could be done in addition to the current ones: visual testing, contract testing, UI performance testing, among others.

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

For the API test scenarios, the focus was given to the CRUD operations of the different entities. The highest priority is given to this operations because they make up the main flow of the application, that is, the main purpose. All users will repeatedly create page users, update their data, upload their pets' information, and make purchase orders.
