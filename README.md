# Hoosat CMS Admin panel

This is Hoosat CMS admin panel which you can use in your project to manage your website content.

## Usage

At Hoosat we use extensively git submodules, which is why I guide you to use git submodule.

First change directory to your React Typescript project `projec/src` directory, then you
can add the submodule and update submodules recursively.

```
git submodule https://https://github.com/Hoosat-Oy/HoosatCMS-client.git
git submodules update --recursive
```

Afterwards in your own project you can import the `Admin` route and use it with `react-router-dom` like in the following example. 

```
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Admin } from './HoosatCMS-client';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hoosatcms" element={<Admin />} />
        <Route path="/hoosatcms/:page" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## UPDATE

Work on this CMS in currently ongoing, which means it is unstable and changes may happen everyday.

## Basic usage of npm scripts.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
