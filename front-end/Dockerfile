# Use an official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose the development server port (e.g., 3000 for React)
EXPOSE 3000

# Run the development server
CMD ["npm", "start"]
