# Use Bun as the base image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb (if exists) for both backend and frontend
COPY backend/package.json backend/bun.lockb* ./backend/
COPY frontend/package.json frontend/bun.lockb* ./frontend/

# Install dependencies for both
RUN cd backend && bun install --production
RUN cd frontend && bun install --production

# Copy source code
COPY backend ./backend
COPY frontend ./frontend

# Build the frontend
RUN cd frontend && bun run build

# Copy the start script
COPY start.js .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start.js"]