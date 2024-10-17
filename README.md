# User Profile Management

A user profile management application built with React and Node.js. It allows users to edit their profile information such as username, email, phone number, gender, and location. The app includes a responsive modal for editing the profile and updates the user data through a REST API.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Server Setup](#server-setup)
- [Client Setup](#client-setup)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Edit user profile details including username, email, phone, gender, and location.
- Validate form fields using `react-hook-form` and Ant Design.
- Display feedback through Ant Design's notification system.
- Responsive design using Ant Design modal and form layout.
- Asynchronous profile updates with a loading indicator during network requests.

## Technologies

- **Frontend**: React, Ant Design, react-hook-form, Axios, Redux, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, JWT for authentication
- **State Management**: Redux Toolkit, React Redux, Redux Persist, Redux Thunk
- **Animations**: Framer Motion
- **Avatar Generation**: @dicebear/avatars

## Usage

1. Register or log in to the application.
2. Click on "Edit Profile" to open the modal.
3. Update your profile details and click "Save".
4. A loading indicator will appear during the update process, and you'll receive a success or error notification.

## Server Setup

- **Node.js Version**: Ensure you are using a version that is compatible with the dependencies.

### Dependencies
- `bcrypt`: For password hashing.
- `cookie-parser`: To parse cookies.
- `cors`: For handling Cross-Origin Resource Sharing.
- `dotenv`: For managing environment variables.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: For handling JWT-based authentication.
- `mongoose`: For MongoDB object modeling.
- `morgan`: HTTP request logger.
- `nodemon`: For automatically restarting the server during development.

### Scripts
- `start`: Starts the Node.js server.

## Client Setup

- **React Version**: Ensure compatibility with `@reduxjs/toolkit` and other React-specific libraries.

### Dependencies
- `@reduxjs/toolkit`, `redux`, `react-redux`, `redux-thunk`, `redux-persist`: For state management.
- `antd`: UI library for React.
- `axios`: For making HTTP requests.
- `framer-motion`: For animations.
- `react-hook-form`: For managing form validation.
- `react-icons`: For adding icons to the UI.
- `react-router-dom`: For client-side routing.
- `@dicebear/avatars` & `@dicebear/avatars-identicon-sprites`: For generating avatars.

### Dev Dependencies
- `vite`: Build tool for modern web applications.
- `eslint`: For maintaining code quality.
- `tailwindcss`, `autoprefixer`, `postcss`: For styling and managing CSS.
- `@vitejs/plugin-react`: React plugin for Vite.
- `@eslint/js`, `eslint-plugin-react`, `eslint-plugin-react-hooks`: For ESLint configurations.
- `@types/react`, `@types/react-dom`: TypeScript type definitions for React.

### Scripts
- `dev`: Runs the development server using Vite.
- `build`: Builds the client for production.
- `lint`: Lints the codebase using ESLint.
- `preview`: Previews the production build using Vite.

## Authentication

This application uses JSON Web Tokens (JWT) for user authentication. Upon successful login, the server issues an access token and a refresh token:

- **Access Token**: This is a short-lived token (typically valid for 15-30 minutes) that is included in the Authorization header as a Bearer token for requests to protected routes.
- **Refresh Token**: This is a long-lived token (valid for days or weeks) used to obtain a new access token once the original has expired. It is sent to the server when the access token expires to generate a new access token without requiring the user to log in again.

## Contributing

Contributions are welcome! To contribute:

1. Fork the project.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

- **GitHub**: https://github.com/MuhammedFahizk 
- **Email**: fahizk100@gmail.com
