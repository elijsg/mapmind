import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cluster0';

let cachedDb: typeof Db | null = null;

export async function connectDB(): Promise<typeof Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI, {
    useUnifiedTopology: true,
  });

  await client.connect();

  const db = client.db();
  cachedDb = db;

  return db;
}
