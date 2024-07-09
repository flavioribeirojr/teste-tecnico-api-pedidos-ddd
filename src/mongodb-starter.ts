import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function startMongoDB() {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'singu-orders' });
}