# Advertising Campaigns Management Client

## Getting started
---

### Introduction
A client app that visualizes a list of Advertising Campaigns, along with their details and platforms.

### Technologies
* ReactJS v16.5
* Redux v4
* Redux-saga v0.16
* React-router v4
* Material-UI v3.2
* Axios v0.18

### Installation

This app's structure was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and supports `eslint` out of the box. Eslint v5.6.0 requires `nodejs version “^6.14.0 || ^8.10.0 || >=9.10.0"`. So make sure your node version is compatible first. Alternatively, you can set a specific node version for only this app using [nvm](https://github.com/creationix/nvm).

Then in the project directory, we can run:

### `yarn`
Installs dependencies.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Now our app is ready to be deployed!

## Folder structure
---

```
app/
├───public
├───src
│   ├───assets
│   │   └───images
│   ├───api   // defines functions to request API
│   │   ├───campaigns   // grouped by modules
│   │   │       index.js
│   │   │   index.js
│   ├───AppRoot   // root component of the whole app
│   │   ├───components
│   │   │       AppRoot.js
│   │   ├───containers
│   │   │       AppRoot.container.js
│   │   ├───test
│   │   │   styles.scss
│   ├───Campaign
│   │   ├───components
│   │   │       CampaignDetails.js
│   │   │       CampaignsList.js
│   │   ├───containers
│   │   │       CampaignDetails.container.js
│   │   ├───test
│   │   │   actions.js    // redux actions and labels
│   │   │   reducers.js
│   │   │   sagas.js
│   │   │   styles.scss
│   ├───Dashboard
│   │   ├───components
│   │   │       Dashboard.js
│   │   ├───containers
│   │   │       Dashboard.container.js
│   │   ├───test
│   │   │   styles.scss
│   ├───Platform
│   │   ├───components
│   │   │       Platform.js
│   │   ├───containers
│   │   ├───test
│   │   │   styles.scss
│   ├───utils // contains helpers, configs, constants, utilities...
│   │       constants.js
│   │       createActions.js
│   │       createSaga.js
│   │       network.js
│   │       routes.js
│   │       serviceWorker.js
│   │       utils.js
│   │   index.js
│   │   index.scss
│   │   rootReducer.js
│   │   rootSaga.js
│   │   setupTests.js
 
```

## UI Decisions
---

The app layout consists of 2 main parts:

* **The left sidebar**: While it has only 1 link to the Home url, the sidebar actually serves more purposes. A sidebar is essential in the dashboard of a management app. It gives user the idea of navigating around the app. It is also a *secret reminder* to developer that he must always take web responsiveness into consideration, since the sidebar usually takes a considerable space of the screen.
* **Main content on the right**: In the */home* page, it will be the dashboard. Since all the campaigns share the same few pieces of basic info, it makes sense to present them in a table with selectable rows. When a row/campaign is selected, the *details panel* will slide in from the right.

   *Details panel* provides user with an overall perspective of all campaigns and the currently selected one, along with its details. Each campaign consists of different advertising platforms divided into tabs. Users can switch between tabs to view and compare platforms, scroll through the panel and still clearly know what campaign they're viewing, where it is in the list. At the same time, jumping to another campaign is just one click away.

## Conventions
---

### MODULES

Represents a feature, a view or a group of them. Modules are the basic also the biggest building blocks of our app, because they contain a lot of information with different types. Everything is defined *based on modules, grouped by modules*: components, redux actions, reducers, sagas, APIs, routing, styles,...

In React's perspective, modules are also components. In our directory structure, they are enlisted as direct sub-folders of ```/src```, then divided into  relative components. With this convention, the modules and the app itself are more scalable for future developments.

There are 2 types of components in each modules, residing in their respectively named folders:

* **Components**, also known as **Presentational** Components. 

* **Containers**.

*What are those and why?*

As we are using Redux to manage states, we follow the pattern above which is recommended by Redux. You can read more about it [here](https://redux.js.org/basics/usagewithreact#designing-component-hierarchy).

*TL;DR:* **Presentational Components** "describe the *look* but don't know *where* the data comes from, or *how* to change it" and "have no dependency on Redux". **Container Components** "connect the presentational components to Redux".


### REDUX ACTIONS

These actions are created by leveraging the **redux-actions** package. Specifically, I wrote a helper function in ```/src/utils/createActions.js```, which receives action *types* (I call them *labels* to avoid misunderstanding with other data types) to produce respectively functions. These functions are then connected by Container components for later *dispatch*-ing.

All action labels must follow some rules:
* In UPPER_CASE format (to imply that they're constants).
* For async actions, actions for successful promises must have labels suffixed with `_SUCCESS`. In error case, it would be `_ERROR`.

By using the helper function **once** (in file ```actions.js``` of each module), we only have to declare Action Labels from now on. No more spending time repeatedly writing an action creator for each one of them.

> Don't repeat yourself.

### REDUX SAGA

Just like the redux actions, all sagas are created by a helper function (```/src/utils/createSagas.js```), which receives an action label and a handler (API-request function). The `rootSaga` will collect all sagas from modules and watch them all together.

#### Error handling:

Any errors that occur during an async action calling network requests will be handled by a saga which will dispatch an error action to reducers. A reducer will update its *error* property upon receiving an error action. The connected ```AppRoot``` component will then receive an *error* prop and show a toast on the screen.

```javascript
  // reducers.js
  const campaignReducer = handleActions({
    ...
    ASYNC_FETCH_ALL_CAMPAIGNS_FAILED: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    ...
  });

  // AppRoot.js
  componentDidUpdate(prevProps) {
    if (this.props.error && !prevProps.error) {
      const { error, } = this.props;
      this.setState({ errorToastMessage: this.getErrorMessage(error), });
    }
  }
```

### NETWORK REQUESTS

Every request to API server is an API function created by a helper (```/src/utils/network.js```), which uses Axios under the hood and receives 2 arguments:
1. API endpoint.
2. Options object, containing: method (defaut 'GET'), additional data (url param or POST data).

All API functions are created in the `/src/api/` folder, group by their related module. They are then provided as handlers for sagas.

### REDUX STATE
Provided the scope of this task, there is only one reducer ```campaignReducer```.

* Default state:
``` javascript
const defaultState = {
  campaigns: [],
  selectedCampaignId: null,
  selectedCampaign: null, // will be fetched from the above id. This makes the store more adaptive to future api changes
};
```

* When a campaign is selected:
``` javascript
{
  campaignReducer: {
    campaigns: [
      {...},
      {...},
      {...},
    ],
    selectedCampaignId: 100000001,
    selectedCampaign: {
      id: 100000001,
      name: 'Test Ad 1',
      goal: 'Increase Reach',
      ...
    }
  }
}
```

### TESTING

The testing is carried out by Jest and Enzyme.

For the sake of demonstration, I focus the testing on the `Campaign` modules as it is the most sophisticated one with a complete collection of components, reducer and sagas.

![Imgur](https://i.imgur.com/jW4h4Ok.png "Test suites")

![Imgur](https://i.imgur.com/5Z93AO2.png "Test results")