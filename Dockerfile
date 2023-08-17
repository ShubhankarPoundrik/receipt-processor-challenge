# Use an official Node.js runtime as the base image
FROM node:20.3.1 AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Intermediate build stage to copy source code
FROM base AS build
COPY . .

# Expose the port that the application will run on
EXPOSE 4000

# Command to start the application
CMD ["node", "index.js"]
