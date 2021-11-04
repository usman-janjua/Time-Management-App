## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
Your app is ready to be deployed!

## Description

Small Project for adding products with certain information related to them.

• The application can create a listing of products in the form of cards and product contains the certain information i.e Name, Description, Price, Inventory Date.
• The user can add a new product and persist the changes.
• Products can be searched
• When refresh the page (ctrl + f5) the products are still persisted.
• Basic UI unit test cases are included.


I used session storage for persisting the state as it will clear the data on tab close. However, local storage can be used if you want to store data permenantly.   
