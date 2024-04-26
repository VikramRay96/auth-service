# Step 1: Define the base image
FROM node:16-alpine

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If using yarn, uncomment the next line and comment out the npm install line
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# For yarn, use:
# RUN yarn install

# Step 4: Copy the app source code
COPY . .

# Step 5: Expose port 8080 for the application
EXPOSE 8080

# Step 6: Command to run the application
CMD ["node", "index.js"]
