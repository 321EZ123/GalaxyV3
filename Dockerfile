# Use a lighter Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Clone the repository
RUN apk add --no-cache git && \
    git clone https://github.com/r480github/GalaxyV3.git . && \
    npm install && \
    npm run build

# Expose the default port
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
