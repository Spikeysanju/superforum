# Use the official Bun image as a parent image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the rest of your app's source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run your app
CMD ["bun", "run", "start"]