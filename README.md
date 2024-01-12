

# Production Management Web App

The Production Management Web App is a web-based solution for managing and scheduling production events. This application simplifies the process of planning and organizing productions, making it easier for teams to collaborate and coordinate their work.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-Started)
  <!-- - [Usage](#usage)
<!-- - [Contributing](#contributing)
- [License](#license) -->

## Features

- **Production Scheduling**: Schedule sports production events with ease, specifying dates, locations, and other relevant details.

- **Location Management**: Maintain a database of production locations, complete with address and weather information.

- **Crew and Talent Management**: Keep track of crew members and talents involved in each production.

- **Weather Integration**: Automatically fetch and display weather data for each production location.

## Technologies Used

- **Front-End**: The front-end of the web app is built using React and Material-UI for a modern and responsive user experience.

- **Back-End**: The back-end relies on Node.js and Express to provide robust server-side functionality.

- **Database**: MongoDB is used as the database to store production and location data.

## Getting Started

### Demo Data (For Testing and Development)

For testing and development purposes, you can generate fake data using the `generateFakeData()` function provided in the server. To enable this feature, make sure to uncomment the following line in your server code ( in `server.js` ):

```javascript
generateFakeData();
```
