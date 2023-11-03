# Frontend README

This README provides information on the frontend part of our project for COMP 333: Software Engineering 2023 at Wesleyan University.

## Project Overview

In this assignment, we have developed a full-stack CRUD (Create, Read, Update, Delete) app with a React frontend that seamlessly integrates with our PHP/MySQL backend via a REST API. The app allows users to manage a list of songs, including creating, reading, updating, and deleting songs. The frontend provides a user-friendly interface to interact with the database.

### Learning Goals Achieved

In this project, we have achieved the following learning goals:

1. Designed and implemented a single-page app (SPA) using JavaScript and React.
2. Utilized the Model-View-Controller (MVC) design pattern to create a Representational State Transfer (REST) API for frontend-backend communication.
3. Gained experience with build tools, package managers, and integrating third-party code.

## Setup and Run the Frontend

Follow the instructions below to set up and run the frontend of our app in a local development environment.

1. **Clone the Repository**: Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/frontend-repo.git
2. **Navigate to the Frontend Directory:** 
    cd frontend-repo
3. **Install Dependencies: Install the required dependencies using npm:** npm install
4 **Run the Development Server: Start the development server for the frontend:** npm start
5. **Accessing the app** Open a web browser and access the app at http://localhost:3000

## MVC Architecture and REST API

Our app follows the Model-View-Controller (MVC) design pattern, which separates the software's business logic, display, and controlling logic.

- **Model**: Manages data and business logic (e.g., SongModel.js, UserModel.js).
- **View**: Handles layout and display (e.g., React components).
- **Controller**: Routes commands to the model and view (REST API via index.php).

## Backend Repository

For details on the backend and how to set up the database, refer to the [Backend README](link-to-backend-readme.md).

## Feature Implementation

In addition to the required CRUD operations, we have implemented the following feature: [Describe the feature you implemented and how to use it.]

## Team Contribution

Please provide an estimate of how much each team member contributed. For example, "50/50" or "60/40". This helps us understand the distribution of work.

- Backend:
   - Nishant Aggarwal:100%
   - Anan Afrida:0%
- Frontend:
   - Nishant Aggarwal: 40%
   - Anan Afrida: 60% 
