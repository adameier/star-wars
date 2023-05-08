# Front End Assessment

`npm install`

`npm run dev`

## Features and Motivations

- Individual movie details are shown in a modal on the same page (becomes fullscreen on mobile and small screens). The alternative is to use react-router with details and the table shown on separate pages. Went with the current approach for the sake of time, and I feel it fits the requirements for now.
- Redux toolkit provides simple and efficient tools to use Redux. Api data is stored in the Redux store, which both the `FilmsTable` and `FilmDetails` components use.
- react-table is a powerful library for managing table data while being completely headless for total UI customization.
- The app has a 'good-enough' mobile UI.
- Styling is done with UnoCSS, a Tailwind-compatible atomic css library. This allows rapid development and the availablity of many pre-configured values, such as colours, font-sizes, etc.

## Improvements

- Some more code cleanup is possible, e.g. extracting table components into their own files.
- Mobile UI for the table could be improved, e.g. removing the need to scroll horizontally.
- More information from the Star Wars API could be used, such as characters, planets, vehicles, etc. However, this information is not included in the film resource and isn't easily queried either, as you either have to fetch these resources individually for each film, or fetch all of these using pagination, so I didn't have the time to solve this problem.
