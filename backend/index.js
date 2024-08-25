import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express(); 

// Middleware for parsing request body ...
app.use(express.json());

// Middleware for handling CORS ...
// Option - 1 --> Allow all Origins with default of cors(*) ...
app.use(cors());
// Option - 2 --> Allow specific / custom Origins ...
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

// normal check of server ...
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome!!!');
});  

app.use('/books', bookRoute);

// check the database connection ...
mongoose.connect(mongoDBURL).then(() => {
    console.log('App Connected to the Database ...');
    app.listen(PORT, () => {
        console.log(`listening on port: ${PORT}`);
    });
}).catch((error) =>{
    console.log(error)
});
