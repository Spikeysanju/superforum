# Use Bun as the base image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb (if exists) for both backend and frontend
COPY backend/package.json backend/bun.lockb* ./backend/
COPY frontend/package.json frontend/bun.lockb* ./frontend/

# Install dependencies for backend
RUN cd backend && bun install --production

# Install ALL dependencies for frontend (including dev dependencies)
RUN cd frontend && bun install

# Copy source code
COPY backend ./backend
COPY frontend ./frontend

# Build the frontend
RUN cd frontend && bun run build

# Clean up frontend dev dependencies
RUN cd frontend && bun install --production

# Copy the start script
COPY start.js .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start.js"]