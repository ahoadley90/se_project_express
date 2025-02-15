# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. This project marks my first experience building a backend application using Express.js. I learned how to structure the application using controllers, routes, and models. Additionally, I used Postman to test the application's endpoints.

Project Overview

This backend application was built with Node.js and Express.js. It follows the MVC (Model-View-Controller) pattern to separate concerns and maintain clean, maintainable code.

Features

CRUD operations with Express.js

Organized MVC structure

API testing using Postman

Basic error handling

Controllers

Controllers handle application logic. In this project, userController.js manages user-related operations like creating, reading, updating, and deleting users.

Models

Models define the data schema and interact with the database. The userModel.js file outlines the structure of a user document.

Routes

Routes define API endpoints that interact with the controller logic. userRoutes.js specifies routes like /api/users to handle user operations.

Testing with Postman

Postman was used to test the application by sending HTTP requests to the various endpoints.

Technologies Used

Node.js

Express.js

MongoDB (Mongoose for ODM)

Postman

Lessons Learned

Structuring an Express.js application using MVC architecture

Implementing CRUD functionality

Testing APIs with Postman

Managing environment variables and database connections

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
