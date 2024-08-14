# My Weather App

My Weather App is a React application built with TypeScript, Vite, Redux Thunk, and Tailwind CSS. It provides current weather information, a 5-day weather forecast, and a search history feature. The app displays weather data in a responsive layout and uses Redux for state management.

# Features

#### Current Weather Summary
- Displays the current date.
- Shows the weather icon, temperature, and description.
- Provides wind speed with an arrow indicating the degree direction.
- Shows visibility.

#### 5-Day Forecast
- Displays a 5-day weather forecast with data in 3-hour intervals.
- Each interval includes the date, time, weather icon, temperature, and description.
- The forecast is presented in a card layout similar to the current weather feature.

#### Search and History
- Search for weather data by country name.
- Display a list of previously searched countries, stored in local storage.
- Each history item can be deleted.
- Clicking on a history item redirects to the home page and displays the weather data for that country.
- If the API returns a "not found" response, an error message is displayed below the search input.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_WEATHER_KEY`

`VITE_SECRET_KEY`

`VITE_BASE_URL`

`VITE_WEATHER_ICON_URL`
## Key Commands

- `npm install` - Install dependencies
- `npm run dev` - Compiles and hot-reloads for development
- `npm run build` - Compiles and minifies for production
- `npm run lint` - Lint checks files
- `npm run format` - Format files

