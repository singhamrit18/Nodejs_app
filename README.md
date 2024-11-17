ONLINE BOOKSTORE APPLICATION FOR THE TEST 1

# FEATURES
1. we can add and manage new customers.
2. we can add manage delte update books in the store.
3. we can order books.

# Getting Started

# Prerequisites
- Node.js should be installed on the system.
- MySQL database should also be installed.

# Installation

1. Download the zip file.
2. Extract the contents to a folder.
3. Install dependencies:
   ```bash
   npm install

# To setup database here are the steps 

CREATE DATABASE bookstore;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    book_id INT,
    quantity INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);


# this is the conent pf the .env file  
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= enter mysql password here---
DB_NAME=bookstore


# start the server in terminal 
node app.js


