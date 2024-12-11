import mongoose from 'mongoose';

const dbConations = async () => {
    try {
        const conactionRespons = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_Name}`);
        console.log(`MongoDB Conacted host: ${conactionRespons.connections[0].host}`);
    } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    } 
}

export default dbConations;