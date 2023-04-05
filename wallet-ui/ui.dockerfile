FROM node:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose port 3000 (where Next.js works by default)
EXPOSE 3000

# Run the command npm run dev to start the development server
CMD ["npm", "run", "dev"]