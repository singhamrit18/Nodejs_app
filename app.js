
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();


app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 

// Database connection
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'Amrit1999@', 
    database: 'bookstore' 
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

// API endpoints

// 1. Get all books
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. Get a  book by ID
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(results[0]);
    });
});

// 3. Add a new book
app.post('/books', (req, res) => {
    const { title, author, price, stock } = req.body;
    db.query('INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)', [title, author, price, stock], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: results.insertId,
            title,
            author,
            price,
            stock,
        });
    });
});

// 4. Update book details
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author, price, stock } = req.body;
    db.query('UPDATE books SET title = ?, author = ?, price = ?, stock = ? WHERE id = ?', [title, author, price, stock, bookId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book updated successfully' });
    });
});

// 5. Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('DELETE FROM books WHERE id = ?', [bookId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

// 6. Add a new customer
app.post('/customers', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: results.insertId,
            name,
            email,
        });
    });
});

// 7. Place an order
app.post('/orders', (req, res) => {
    const { customer_id, book_id, quantity } = req.body;
    
    db.query('SELECT stock FROM books WHERE id = ?', [book_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0 || results[0].stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        
        db.query('UPDATE books SET stock = stock - ? WHERE id = ?', [quantity, book_id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            db.query('INSERT INTO orders (customer_id, book_id, quantity, order_date) VALUES (?, ?, ?, NOW())', [customer_id, book_id, quantity], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ orderId: results.insertId, customer_id, book_id, quantity });
            });
        });
    });
});

// server starting............
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
