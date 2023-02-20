import { MongoClient } from "mongodb";

const connectionString = 'mongodb://localhost:27017'

let dbConnection;

export async function connectToServer() {
  try {
    const client = await MongoClient.connect(connectionString);

    console.log("Successfully connected to MongoDB.");

    return client;
  } catch (err) {
    throw new Error(err);
  }
}
export function getDb() {
  return dbConnection;
}