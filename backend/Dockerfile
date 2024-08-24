# Use Bun as the base image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb* for frontend
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the frontend source code
COPY . .

# Build the frontend
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Start the frontend
CMD ["bun", "run", "start"]