import { spawn } from 'child_process';

// Start the backend
const backend = spawn('bun', ['run', 'backend/index.js'], { stdio: 'inherit' });

// Start the frontend
const frontend = spawn('bun', ['run', 'frontend/build'], { stdio: 'inherit' });

// Handle process exit
process.on('SIGTERM', () => {
  backend.kill();
  frontend.kill();
  process.exit(0);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  frontend.kill();
  process.exit(code);
});

frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  backend.kill();
  process.exit(code);
});