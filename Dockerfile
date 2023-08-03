# Use the official Node.js base image
FROM node:14 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Install dependencies
RUN npm install  --force

# Copy all the application files to the container
COPY . .

# Build the Vue.js application
RUN npm run build
