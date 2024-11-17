// models/books.js
const db = require('../config/database');

// Create a book
const createBook = (book) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Books (title, author, price, stock) VALUES (?, ?, ?, ?)';
        db.query(sql, [book.title, book.author, book.price, book.stock], (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, ...book });
        });
    });
};

// Get all books
const getAllBooks = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Books';
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Get a specific book by ID
const getBookById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Books WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// Update book details by ID
const updateBook = (id, book) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Books SET title = ?, author = ?, price = ?, stock = ? WHERE id = ?';
        db.query(sql, [book.title, book.author, book.price, book.stock, id], (err, results) => {
            if (err) return reject(err);
            resolve({ id, ...book });
        });
    });
};

// Delete a book by ID
const deleteBook = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Books WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve({ message: 'Book deleted successfully' });
        });
    });
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
