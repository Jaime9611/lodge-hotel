# Lodge Hotel Frontend

This is the Frontend implementation for the Lodge Hotel app.

This project uses Javascript and React library to create the UI that makes use of the backend services.

## Table of content

1. [Tech Overview.](#tech-overview)
2. [Project Structure.](#project-structure)
3. [How to run.](#how-to-run)
   1. [Create .env file](#create-env)
   2. [Run the project](#run-the-project)

## Tech Overview

This was created using the following technologies:

- Node version v22.17.0
- React version 19.1.0
- yarn version 1.22.21

In order to run this project ensure you installed and setup your environment with these technologies.

## Project Structure:

Inside the src the project follows this structure

- **contexts**: All React Context use in the application and hooks related.
- **features**: Main components and hooks they use, separeted by the features of this app (cabins, bookings, etc).
- **hooks**: Global hooks use in different parts of the application.
- **mocks**: Mock services for testing API calls.
- **models**: All Typescript types that are use in the project.
- **pages**: Components used to separe the app by Pages.
- **services**: All functions to call the backend endpoints.
- **ui**: All common and global UI components use by features and pages.
- **utils**: Common methods to convert or format data and project constants.

## How to run:

### Create `.env`

This project needs a `.env` file with a variable to add the Backend url:

```.env
VITE_API_BASE_URL="http://localhost:8080"
```

### Run the project

Using the `yarn` node tool you can run the application in the following way:

Install dependencies:

```bash
yarn install
```

Run the app:

```bash
yarn dev
```

## References

- {React Course} https://www.udemy.com/share/108PTo/
