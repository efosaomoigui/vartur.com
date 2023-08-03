# Vartur.com Fullstack Project

This repository contains the full-stack project for Vartur.com, which includes the backend API built with Fastify (vartur.com.fastify) and the frontend Vue.js application (vartur.vue-ui). The project utilizes TypeScript for backend development and includes support for database migration using Prisma. The API communicates with a MySQL database to manage categories and products.

Backend API (vartur.com.fastify)
Requirements
Node.js (v14 or higher)
MySQL database
Getting Started
Install dependencies:

## Getting Started
Install dependencies:

```javascript
bash
Copy code
cd vartur.com.fastify
npm install
```


## Configure the environment variables:
Use .env file in the root of the vartur.com.fastify folder and set the following environment variables:

```
bash
Copy code
PORT=3000
DB_URL=mysql://username:password@localhost:3306/varturdb
Replace username, password, and varturdb with your MySQL database credentials and database name.
```

##  Run database migrations:

```
bash
Copy code
npm run prisma:generate
npm run prisma:migrate
Start the Fastify server:
bash
Copy code
npm run dev
The backend API will be accessible at http://localhost:3000.
```

API Endpoints
```
GET /healthCheck: Check the health of the API.
GET /api/categories: Get a list of categories as a tree.
GET /api/categories/:id: Get a single category by ID.
POST /api/categories: Create a new category.
PUT /api/categories/:id: Update an existing category.
DELETE /api/categories/:id: Delete a category and its associated products.
GET /api/products: Get a list of products.
GET /api/products/:id: Get a single product by ID.
POST /api/products: Create a new product.
PUT /api/products/:id: Update an existing product.
DELETE /api/products/:id: Delete a product.
Frontend Vue.js App (vartur.vue-ui)
```


Requirements
```
Node.js (v14 or higher)
Getting Started
Install dependencies:
bash
Copy code
cd vartur.vue-ui
npm install
Configure the environment variables:
Create a .env file in the root of the vartur.vue-ui folder and set the following environment variable:
```

arduino
```
Copy code
VUE_APP_API_URL=http://localhost:3000
Replace http://localhost:3000 with the URL of your backend API (vartur.com.fastify) server.

Start the Vue.js app:
bash
Copy code
npm run serve
The Vue.js app will be accessible at http://localhost:8080.
```

## Features
The app communicates with the backend API to manage categories and products.
Categories are displayed as a tree, and the count of products for each category and its recursive children is shown.
Products can be created, updated, and deleted.
The app allows for image resizing to 3200x3200 pixels when uploading product ^ category images |(Note: uploads/ in he root directory is where the images go. You may want to provide access to the folder).

## Additional Notes
The backend API is documented using Swagger and can be accessed at http://localhost:3000/vartur/docs.
Make sure your MySQL database is up and running with the correct configurations specified in the backend .env file.

## Database Migration
The project uses Prisma for database migration. The migration files can be found in the vartur.com.fastify/prisma/migrations folder. When changes are made to the database schema, you can generate and apply the migrations using the following commands:

```
bash
Copy code
cd vartur.com.fastify
npm run prisma:generate
npm run prisma:migrate
Make sure to have the correct database URL set in the backend .env file before running the migration commands.
```

Deployment
For deployment, ensure that both the backend API (vartur.com.fastify) and the frontend Vue.js app (vartur.vue-ui) are properly built and hosted on a server accessible from the internet. Make sure to update the Vue.js app's .env file with the production API URL.

Contact
If you have any questions or need further assistance, feel free to contact us at support@vartur.com.

