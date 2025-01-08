# Use the latest LTS version of Node.js
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Build the application
RUN npm run build

# Install `serve` to serve the production build
RUN npm install -g serve

# Expose the port your app runs on
EXPOSE 3000

# Command to serve the application
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
