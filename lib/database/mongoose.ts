import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Typing the `global` object for caching the Mongoose connection
interface GlobalMongoose {
  mongoose: MongooseConnection;
}

// Type assertion for `global` to avoid using `any`
let cached: MongooseConnection = (global as unknown as GlobalMongoose).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = (global as unknown as GlobalMongoose).mongoose = { 
    conn: null, promise: null 
  };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginify', bufferCommands: false 
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
