# Creating a Responsive UI with different pages

This is a simple dashboard application built with React. It features a header with a personalized greeting, a sidebar for navigation, 
and a content area displaying user details. The application also includes a login page that authenticates users and saves their details in `localStorage`.

## Features

- User authentication with email and password.
- Sidebar for easy navigation.
- Display of user details in the dashboard.
- Toggle sidebar view.

## Components

### Header

The `Header` component displays user's profile initials.

### Sidebar

The `Sidebar` component provides navigation links and a logout button. The sidebar can be toggled open or closed.

### Dashboard

1. The `Dashboard` component is the main content area. It displays the user's email (sliced before the `@` symbol) and includes the `Header` and `Sidebar` components.
2. This component contains the tasks of the user
3. We have add new tasks and also delete existing tasks

### Login

The `Login` component handles user authentication. On successful login, user details are saved to `localStorage` and the user is redirected to the dashboard.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Nageenask0786/react-js-assignment/
```
2. Navigate to Project Directory
```bash
cd react-js-assignment
```

### Third party packages
- [react-icons](https://react-icons.github.io/react-icons/): For providing icons used in the sidebar and login form.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): For handling routing and navigation.
- [uuid](https://www.npmjs.com/package/uuid): For generating unique IDs for key attributes in components.
- [create-react-app](https://create-react-app.dev/): Used as the boilerplate to scaffold and build the React application.

### Deployed Link
https://react-js-assignment-ten.vercel.app/login


