import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;

// server running with mongoose
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Bike Server App Listening on port ${config.port}`);  
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandled rejection error
process.on('unhandledRejection', () => {
  console.log('UnhandledRejection is detected, shutting down...');
  if (server) {
    server.close(() => {
      process.exit();
    });
  }

  process.exit();
});

// handle uncaught exception error
process.on('uncaughtException', () => {
  console.log('UnhandledException is deleted, shutting down...');
  process.exit();
});
