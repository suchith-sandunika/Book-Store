import express from "express";
import {Book} from '../models/bookModel.js';
import {PORT, mongoDBURL} from '../config.js';
import mongoose from 'mongoose';

const router = express.Router();

// Route to save a new Book ...
router.post('/', async (request, response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message: 'Please fill all the required fields ...',
            });
        } 
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch(error){
        console.log(error.message);
        response.status(500).send({
            message: error.message,
        });
    }
}); 

// Route to get all Books ...
router.get('/', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch(error){
        console.log(error.message);
        response.status(500).send({
            message: error.message,
        });
    }
}); 

// Route to get a relevant Books ...
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch(error){
        console.log(error.message);
        response.status(500).send({
            message: error.message,
        });
    }
}); 

// Route for update a book ...
router.put('/:id', async (request, response) => {
    try{
        // if(!request.body.title || !request.body.author || !request.body.publishYear){
        //     return response.status(400).send({
        //         message: 'Please fill all the required fields ...',
        //     });
        // } 
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'Book not found' });
        } 

        return response.status(200).json({ message: 'Book updated successfully !' });
    } catch(error){
        console.log(error.message);
        response.status(500).send({
            message: error.message,
        });
    }
}); 

// Route to delete a Book ...
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const output = await Book.findByIdAndDelete(id);

        if(!output){
            return response.status(404).json({ message: 'Book not found' });
        } 

        return response.status(200).json({ message: 'Book deleted successfully !' }); 

    } catch(error){
        console.log(error.message);
        response.status(500).send({
            message: error.message,
        });
    }
}); 

export default router;