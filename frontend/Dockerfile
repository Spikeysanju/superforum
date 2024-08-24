# Use Bun as the base image
FROM oven/bun:latest AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb* ./

# Remove existing node_modules (if any) and install dependencies
RUN rm -rf node_modules && bun install

# Copy the rest of your application
COPY . .

# Build the SvelteKit app
RUN bun run build

# Expose the port the app runs on
EXPOSE 4173

# Set the command to run the SvelteKit preview server
CMD ["bun", "run", "preview"]
