# auth-system
A basic expressJS application backend with authentication from an internal and external provider and CRUD routes.

Application is deployed via render on SwarrgerUI Api docs: https://auth-system-tf6j.onrender.com/api-docs/

(Note: Please change the servers in SwaggerUI to avoid CORS issue)

## What is the use of this Repo

This Project is a simple REST Api server (Express + NodeJS) which demonstrates the following features:]

As a user:

- register a new account.
- login and logout features with jwt session management
- User profile related CRUD options:
    - get users: depedning on user role (admins can see all profiles, users can see just public ones)
    - get self user profile
    - update profile related data
    - update profile status

## Application Routes:

<img width="1221" alt="Screenshot 2024-08-01 at 9 26 51 AM" src="https://github.com/user-attachments/assets/97f563bb-0c10-4843-8737-4f5f8b97dda9">

## Prerequisites

### Install Node

Refer to https://nodejs.org/en/ to install nodejs

## Cloning and Running the Application in local

- Clone the project into local:

```bash
 git clone https://github.com/YashS96/auth-system.git
```

- Install all the npm dependencies. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

- In order to run the application Type the following command.
- The start script runs on nodemon at the moment.

```bash
npm run start
```

- Node command can also be used to spin the server.

```bash
node index.js
```
Post man or Swagger UI can be used to test the apis.

- The Application back-end runs on port: **localhost:8000**
- swaggerUI: **localhost:8000/api-docs**

- Application is deployed via render on SwarrgerUI Api docs: https://auth-system-tf6j.onrender.com/api-docs/

## Application design
The application is a based on a MVC architecture style.

The express server uses cluster module to make use of all the cores available in the system.

It uses JWT tokens for session management wit a timeout of 15 mins.

#### Express Server

API Endpoints:

POST:
 - http://localhost:8000/login/
 - http://localhost:8000/logout/
 - http://localhost:8000/user/status
 - http://localhost:8000/user/update

PUT:
- http://localhost:8000/register/

GET:
 - http://localhost:8000/user/all/
 - http://localhost:8000/user/{:id}
 - http://localhost:8000/auth/google

## Resources

**ExpressJS** : Refer to https://expressjs.com/ to understand the concepts of Express and Routing

**NodeJS** : Refer to https://nodejs.org/en/ to understand the concepts of NodeJS

**Swagger** : Refer to https://swagger.io/ to understand the concepts of Swagger for dcumenting API

## Improvements

A lot of functionalities should have been added, but due to time constraints I was unable to add them:

- Validations anbd Security: Adding validationsfor all api incoming requests.
   
- Tests: unit tests for front and back end code, including integration via mocking frameworks.

- Data Storage: Using a permanent store such as mongoDb/DynamoDB instead of reading data from a Json file.
  
- Logging also needs to be introduced as scale grows.

