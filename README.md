# Cuna Coding Challege

---

### Objective

The objective was to build a small application to pre-qualify users for a loan.

### Technology Used

React, Typescript, React-Bootstrap, React-Router, and React Testing Library

### To Run It Yourself

Clone or download the repository. To clone: `git clone https://github.com/amenotu/cc_cuna.git`

Navigate into the directory, then `npm install`.

To run the development server, `npm start` then go to `localhost:3000`

**OR**

See the deployed application here: https://codingchallengecuna.surge.sh

### Notable Details

- Routing is handled with React-Router, a widely used routing library with community support. NextJS was briefly considered, but ultimately decided it would have been too robust for the scope of this application.

- Testing is done through React Testing Library. Basic tests are written to assure expected validation behavior.

- React Context API for global state management, in lieu of Redux, resulting in less boiler plate. Redux would have been overkill for the scope of this excercise. I know I could have used component state to implement what needed to be done, but I wanted to demonstrate how I could leverage the React Context API. A downside to using React Context API is the lack of tools available for debugging in the browser, which is available for Redux through the Redux DevTools plug-in.

- React-Bootstrap for less complex form validation and simple styling,

- More complex form validation handled with custom methods that use Regex, found in the new account page.

- mockFetch implemented to emulate an API call done by the Fetch API. My implementation uses Request-like and Response-like objects.

- Error-handling could have been done within the promise, in the mockFetch, but I did not implement that due to time.

- Coding exercise done in Typescript to leverage tooling and strong typing.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
