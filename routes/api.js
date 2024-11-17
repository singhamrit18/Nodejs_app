const express = require('express');
const router = express.Router();
const books = require('../models/books');
const customers = require('../models/customers');
const orders = require('../models/orders');

// Books Routes
router.get('/books', async (req, res) => {
    try {
        const allBooks = await books.getAllBooks();
        res.status(200).json(allBooks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await books.getBookById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/books', async (req, res) => {
    try {
        const bookId = await books.createBook(req.body);
        res.status(201).json(bookId);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await books.updateBook(id, req.body);
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await books.deleteBook(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Customers Routes
router.post('/customers', async (req, res) => {
    try {
        const customerId = await customers.createCustomer(req.body);
        res.status(201).json({ id: customerId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Orders Routes
router.post('/orders', async (req, res) => {
    const { customer_id, book_id, quantity } = req.body;
    try {
        const book = await books.getBookById(book_id);
        if (!book || book.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }
        
        const orderId = await orders.createOrder(req.body);
        // Update stock after creating the order
        const updatedStock = book.stock - quantity;
        await books.updateBook(book_id, { ...book, stock: updatedStock });
        
        res.status(201).json({ orderId, customer_id, book_id, quantity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const allOrders = await orders.getAllOrders();
        res.status(200).json(allOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
