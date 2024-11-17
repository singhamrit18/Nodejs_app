
const db = require('../config/database');


const createOrder = (order) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Orders (customer_id, book_id, quantity, order_date) VALUES (?, ?, ?, ?)';
        db.query(sql, [order.customer_id, order.book_id, order.quantity, order.order_date], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};


const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Orders';
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};



module.exports = { createOrder, getAllOrders };
