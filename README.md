# DemoQA and PetStore Automated Tests

## Scenarios

### Web Tests - DemoQA

1. **Navigation**: <br>Given a user navigates to demoqa.com<br>When a user selects a `category`<br>Then the user is taken to the corresponding `category` URL<br>and the corresponding `category` in the left panel is unfolded<br>and the corresponding menu list is visible.
1. **Forms**:
1. **Widgets**:

### Selection of Tests

Navigation is one of the most important elements of a website. In addition, it is a test scenario that can be time-consuming, and usually very repetitive, so it is a good automation candidate.

After analyzing the system under test, it was concluded that test scenarios involving filling out forms and selecting values from widgets would be the ones that consume the most time when being executed manually. Therefore, those test scenarios were selected to be automated as well.
