import mongoose from 'mongoose';
import config from '../config';

const dbConnection = async () => {
  try {
    const connected = await mongoose.connect(
      `${config.database_Url}/${config.database_Name}`,
    );

    console.log(`MongoDB Connecting to ${connected.connections[0].host}`);
  } catch (error: any) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default dbConnection;
