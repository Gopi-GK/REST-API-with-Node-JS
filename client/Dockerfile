# Use Node.js v14 as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using npm
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Set the environment variable
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
