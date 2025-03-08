# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/r480github/GalaxyV3.git .

# Install the dependencies
RUN npm install

# Expose the default port
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
