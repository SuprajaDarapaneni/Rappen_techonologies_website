# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json .

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install a lightweight web server to serve the React app
RUN npm install -g 

# Set the command to start the web server and serve the built application
CMD ["npm", "start"]

# Expose port 5000 to access the app
EXPOSE 3000
