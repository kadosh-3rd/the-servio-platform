import mongoose from "mongoose";
// import './models/Restaurant';

// Retrieving the MongoDB URI from the environment variables and throwing an error if it is not defined.
const MONGODB_URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : (() => {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    })();

// Caching the connection to improve performance and avoid creating multiple connections.
let cached = global.mongoose;
declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

// Handling the connection logic and returning the established connection.
async function dbConnect() {
  if (!cached) cached = global.mongoose = { conn: null, promise: null };

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}

export default dbConnect;
