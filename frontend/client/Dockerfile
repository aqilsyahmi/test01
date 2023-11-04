# ../frontend/client/Dockerfile
# Use the official Node.js 20.9.0-alpine3.18 image as the base image
FROM node:20.9.0-alpine3.18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
