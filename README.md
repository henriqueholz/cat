# Cats App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## How to run and build the application locally

- Clone the Git repository onto your machine.
- Run the `npm install` command to install the necessary packages.
- Run the `npm run start` command to start the application.

## How to run tests locally

- Run the `npm run test` command to run the tests.
- Run the `npm run coverage` command to generate a test coverage report. This report can be found at coverage/icov-report/index.html.

## Detailed implementation

The implementation consists of two hook slices: one for requesting the Cat API at https://thecatapi.com/ and another for managing all states. These slices are combined into a single source of truth within the store file.

# catApiSlice

This slice contains the request for retrieving all cat breeds from the Cat API. The data is retrieved using RTK query when the application is rendered for the first time and every 30 minutes thereafter using the `pollingInterval`. The result is then combined with the cached cat favorite list, and the combined result is stored in the Redux cache lists.

# catSlice

This slice is responsible for managing the redux state, which is composed of the following:

- `fullList`: Used to store the Cat API data combined with the `favoriteList`. This list will be used to update the `filteredList` each time a new filter is applied.
- `favoriteList`: Used to store the favorite cats in a list.
- `filteredList`: Contains the `fullList` sorted and filtered. This list will be rendered on the cat list page.
- `sortParam`: Stores the current sorting parameter.
- `filterParams`: Stores the current filtering parameters.

# Reducers

- `updateCatList`: Used to store the Cat API data combined with the `favoriteList` inside `fullList` and `filteredList`.
- `updateCat`: Receives an updated cat and updates the `fullList`.
- `updateFavorite`: Receives an updated cat with a new favorite cat. This cat is inserted or removed from the `favoriteList`, and updated into the `fullList` and `filteredList`.
- `updateFilteredList`: Updates the `filteredList`.
- `updateSort`: Used to sort the `filteredList`.
- `updateFilter`: Used to create a new `filteredList` based on the `fullList`.

# Selectors

- `selectCatList`: Retrieves the `fullList`.
- `selectCat`: Retrieves a cat by ID from the `fullList`.
- `selectFavorites`: Retrieves the `favoriteList`.
- `selectFilteredList`: Retrieves the `filteredList`.
- `selectSort`: Retrieves the sorting parameter object.

# Cat List Page

This is the main page of the application. It has two tabs at the top with sorting and filtering options. The grid view displays the sorted and filtered list of cats.

## Sort tab

The first tab allows you to choose the parameter by which you want to order your cats: name, imperial weight, lifespan, and origin. You can also click on the arrow next to it to choose between ascending or descending order. By default, the cats are sorted by name in ascending order.

## Filter tab

Clicking on the second tab displays the filter fields on the screen. These fields can be used to filter the grid view cats based on various criteria, such as name, lifespan, "favorited" status, imperial weight, and origin. The filter panel allows multiple filters to be applied simultaneously.

To apply the filters, click on the "Apply" button. To reset the filters, click on the "Reset" button.

## Grid view

The grid view presents a card for each cat in the cat list. Each card contains an image, name, lifespan, imperial weight, and origin, as well as an overlay heart icon that indicates whether the cat is on your favorite list or not. Clicking the heart icon toggles its state. Clicking on a cat card opens a detailed page about the cat.

# Detail List Page

By clicking on a cat image on the cat list page, you will be redirected to the cat detail page. On this page, you will see the same card with the cat's information than the previous page, which can also be used to favorite or unfavorite the cat. Below the card, there are two buttons: "UPLOAD" and "DELETE" that can be used to upload or remove a personal cat image for this card.
Below these buttons, you can find the cat's description and additional information, each with star icons to illustrate its value.

## Replace the cat image

On the cat info page, below the cat card, there are two buttons: "UPLOAD" and "DELETE". These buttons allow users to upload and remove a personal cat image for the card. The "UPLOAD" button saves the selected image to the redux fullList and to the user's local storage using base64 format. When rendering any cat card image, it checks the user's local storage for an image associated with the cat ID, and displays that image instead of the default image if one is found. The "DELETE" button removes the uploaded image from the user's local storage, causing the original image from the cat API to be displayed.

## Favorite

The favorite status of each cat is displayed as a heart icon on each cat's card, whether it is on the cat list or cat info page. If the heart is filled, it means the cat is a favorite, otherwise it is not. It behaves similarly to Instagram "likes"; you can click on the heart icon to change the favorite status.

## Others

- On the right side of the header, you'll find a button that allows you to switch between two available themes: 'dark' and 'light'. Simply click the button to change the theme. The theme switcher was implemented using custom hooks.
- In addition, all cat images on the page have lazy loading enabled and a fallback image in case the original image is not found.
- The catSlice.test.tsx file contains the tests for the reducers and selectors, which were written using the React Testing Library.
