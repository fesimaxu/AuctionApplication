# AN AUCTION API

# A REST API with Node.js, Postgres & TypeScript

## Project Overview:
An Auction Application Programming Interface: to auction an valueable asset, giving each user power to create an auction and also bid for other users auction, making payment using Bitcoin or ligtening network.

Note: This repository includes the [postman collection for the finished API](https://documenter.getpostman.com/view)

Added .env, and node_modules to my .gitignore before pushing any changes to your repository. 

## Common issues
* Managing environment variables

## Architecture:

Backend Framework: Node.js with Express.js
Database: Json File for storing account data
API Documentation: Postman for clear API documentation
Validation: joi for user's Json payload validation
security: JWT Token for authorization and authentication of user
Version Control: Git and GitHub for collaborative development
Deployment: Render for hosting

## Concepts
* REST API principals
    * CRUD
    * HTTP methods
* Request validation
* Security
* Payment

## Tools Used
* Postman
* An IDE or text editor (VS Code)
* A package manager such as NPM or Yarn
* Node.js installed

## Technologies
* Node.js
* TypeScript
* Express.js & Express.js middleware
* Joi validation
* JsonWebToken authorization

## Folder Structure:

* src: Contains the application source code.
* controllers: Handle request and response logic.
* models: Define database models.
* routes: Define API endpoints.
* middlewares: Implement middleware functions (error handling middlware).
* config: Store configuration files.
* tests: Contains unit and integration tests.
* docs: Stores API documentation files.

## Design Structure
## Database Design:

* Postgres: Create data and storing user data.
* Data: Store account information (e.g., User's Personal Information, items, Bids, Auctions ).

## API Endpoints:

## Endpoint 1: Create a New User (POST /api/createuser)

* Receives JSON payload with user details.
* Validates data.
* create a new user.
* Stores data in the database.
* Responds with a user details.

## Endpoint 2: Create a New Item (POST /api/createitem)

* Receives JSON payload with item details.
* create a new item.
* Stores data in the database.
* Responds with an item details.

## Endpoint 3: Create a New Auction (POST /api/createauction)

* Receives JSON payload with auction details.
* create a new auction.
* Stores data in the database.
* Responds with an auction details.

## Error Handling:

* Implement a robust error-handling mechanism.
* Provide clear and informative error messages in the API responses.

## Testing:

* Write unit tests for controllers, models, and middleware.
* Write integration tests to test the API endpoints.
* Use testing libraries like Jest and Supertest.
## Documentation:

* Generate API documentation using Postman or a similar tool.
* Include detailed information about how to use each endpoint

## Versioning:
* Implement API versioning to ensure backward compatibility.

## Security:
* JsonWebToken 

## Payment Channel: 
The Magic Internet Money Payment System is a visionary initiative by Qala Africa to promote financial inclusion and innovation across Africa. This repository showcases the development of a project aimed at integrating Bitcoin and the Lightning Network to empower individuals with seamless, secure and convenient payment solutions. This project demonstrates a basic working knowledge of Bitcoin and the Lightning Network by building a simple auction api for accepting payments and providing confirmation to the user. It's meant to serve as a learning exercise and starting point for understanding cryptocurrency payment workflows.
  
# Deployment
* Render - Web server

