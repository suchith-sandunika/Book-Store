import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import cors from 'cors';

const app = express(); 

// Middleware for passing request body ...

app.use(
    cors({
        origin: 'https://localhost:3000',
        method: ['GET','POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hi... Welcome!");
}); 

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB...');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`);
        })
    })
    .catch((error) => {
        console.log("Error Occured!");
        console.log(error);
    });