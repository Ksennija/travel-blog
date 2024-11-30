# Getting Started with Travel Blog

Travel Blog is a library of different countries that I have ever visited, and my own descriptions of the countries with photos. Also in the futire it supposed to be some notes about places nearby or some events I have visited. You can add, edit and delete countries, so as add to favourites and search the countries using the Search form.

This frontend part of the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The backend part uses Node.js and saves the data in json file.

To setup this project I used this manual:
https://levelup.gitconnected.com/fullstack-react-node-js-typescript-e52c0698281e

## Available Scripts

In the project directory, you can run:

### `npm run build`

I used the package called concurrently, so this command runs both backend and frontend.

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The backend runs on http://localhost:3001

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

# Main project features

The frontend part has component AppRoot that uses React-router-dom and renders the component Sidebar with the list of the countries on the left side of the page. On the right side there are three different options depending on routing: WelcomePanel - some introduction page, CountryPanel - the details of the country and EditPanel.

For styling I used Module CSS.

The idea of the application design is form React Router Tutorial: https://reactrouter.com/6.28.0/start/tutorial

On the EditPanel you can select an image using the ImagePicker. I have developed it on my own, inspired by styling from here https://github.com/bagongkia/react-image-picker

# Contributing

The feedbacks are welcome. For pull requests with changes, please open an issue first to discuss what you would like to change.
