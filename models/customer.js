// models/customers.js
const db = require('../config/database');

// Create  customers
const createCustomer = (customer) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Customers (name, email) VALUES (?, ?)';
        db.query(sql, [customer.name, customer.email], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};

// Get all customers
const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Customers';
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};



module.exports = { createCustomer, getAllCustomers };
