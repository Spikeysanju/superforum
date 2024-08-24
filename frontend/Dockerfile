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

# Build the frontend in production mode
RUN bun run build

# Expose the port the app runs on
EXPOSE 5173

# Start the frontend in preview mode
CMD ["bun", "run", "preview"]

