
import mongoose, { MongooseOptions } from "mongoose";
import bluebird from "bluebird";


const connectDB = async() => {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/marketplace';
    mongoose.Promise = bluebird;
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true } as MongooseOptions ).then(
        () => { console.log('Connected to Database First Time'); },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });
    
    mongoose.connection.on('error', err => {
        console.log(err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });
}

export default connectDB;
