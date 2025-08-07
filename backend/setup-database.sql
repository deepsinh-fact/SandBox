-- Create the database
CREATE DATABASE IF NOT EXISTS portal_db;

-- Use the database
USE portal_db;

-- Create a basic users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a basic clients table
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some test data
INSERT IGNORE INTO users (email, password, name) VALUES 
('test@gmail.com', 'password123', 'Test User'),
('admin@example.com', 'admin123', 'Admin User');

INSERT IGNORE INTO clients (name, email, phone, address) VALUES 
('John Doe', 'john@example.com', '123-456-7890', '123 Main St'),
('Jane Smith', 'jane@example.com', '098-765-4321', '456 Oak Ave');