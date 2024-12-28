# React TypeScript Project with Context API and Fetch

## Description

This is a simple React application with TypeScript, Context API for state management, and a mock authentication and theme switching system. The project uses `fetch` for making HTTP requests.

## Features

- **Authentication**: Allows users to sign in and sign up with mock endpoints.
- **Theme Management**: A light/dark theme toggle that is persisted across sessions.
- **User Management**: Includes functionality to manage users using mock API endpoints.

## Project Structure

src/
├── components/
│ ├── Auth
│ │ ├── Logout.tsx
│ │ ├── SignIn.tsx
│ │ └── SignUp.tsx
│ ├── Dashboard/
│ │ ├── components/
│ │ | ├── user-list/
│ │ | | ├── UserList.tsx
│ │ | | └── UserTable.tsx
│ │ | └── UserForm.tsx
│ │ └── Dashboard.tsx
│ └── Layout
│ └── ThemeToggle.tsx
├── context/
│ ├── AuthContext.tsx
│ └── ThemeContext.tsx
├── utils/
│ ├── api.ts
│ └── types.ts
├── App.tsx
└── index.tsx

## Installation

To get started, clone the repository and install the dependencies:

git clone <repository_url>
cd <project_name>
npm install

Running the App
To run the app in development mode:
npm start
Visit http://localhost:3000 in your browser.

To run all the tests, use the following command:
npm test

Technologies Used
React
TypeScript
Context API
Fetch (for HTTP requests)
LocalStorage
