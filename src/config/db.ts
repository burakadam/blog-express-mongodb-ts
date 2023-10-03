import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);

    const connection = await mongoose.connect(process.env.MONGO_URL ?? '');
    console.log(`Mongo database connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Mongo database connection error: ${error}`);
  }
};

export { connectDB };
