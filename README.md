# Stocks coding challenge

## How to run the application

There are two apps: `stocks` and `stocks-api`.

- `stocks` is the front-end. It uses Angular 7 and Material. You can run this using `yarn serve:stocks`
- `stocks-api` uses Hapi and has a very minimal implementation. You can start the API server with `yarn serve:stocks-api`

A proxy has been set up in `stocks` to proxy calls to `locahost:3333` which is the port that the Hapi server listens on.

> You need to register for a token here: https://iexcloud.io/cloud-login#/register/ Use this token in the `environment.ts` file for the `stocks` app.

> The charting library is the Google charts API: https://developers.google.com/chart/

## Problem statement

[Original problem statement](https://github.com/tmobile/developer-kata/blob/master/puzzles/web-api/stock-broker.md)

### Task 1

Code review comments of the base `master` branch:

#### Task 1-A
1. What is done well?
    - Used ngrx feature for state management, it improve the application performance
    - For the form validation purpose used FormBuilder, FormGroup, Validators stocks component. Using this in-built/predefined features easily we can addressed the applicatoin form validation part.
    - In order to save developers efforts we can use predefined angular features like angular material, google chart, It should be injected wherever it required in order to use it.

2. What would you change?
    - Need to use access specifiers wherever needed
    - Validation is required while form submission, all input should be validated before submitting the form accordingly if any input field doesn't get validate we can show the error message. So user will get know what input need to pass.
    - All hard-coded values needs to be in separate constant file. We can have one application level constant file if application is not big. If application is big then there would be separate constant file per feature/module. In this application I have added separate constant files for stock, chart and also added app level constant file.
    - In order to well structed application we can have interfaces, enums, models clasees wherever necessary. And it should reusable.
    - As per current implementation graph wouldn't shown on UI as data is missing in chart component file. Need to pass data from stock to chart using async.
    - In order to run application smoothly, writting test cases required. Test cases needs to addedd and it should covered all logical aspects of application. I have added test cases almost for all changes.
    - Needs to cover accessibility - changes added.
    - async pipe of ngrx can be use to pass observable data.
    - Code indentation is required.

3. Are there any code smells or problematic implementations?
    - Form Validation is not handled, it should be handled before making call to API. And also accordingly error messages should be displayed if input is not valid.
    - Grapgh wouldn't be shown on UI as data is empty in chart component so we can use async pipe to pass data from stock component to chart componet.


> Make a PR to fix at least one of the issues that you identify
    - PR Raised

#### Task 1-B

[Accessability](https://www.w3.org/WAI/GL/WCAG20/) is an important feature of all public facing websites.  

> Make a PR to add accessability features to the web application

