CREATE DATABASE your_database;
USE your_database;
-- Create a new table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    pwd VARCHAR(50)
);

-- Insert some data
INSERT INTO users (username, pwd)
VALUES 
    ('dan', 'dan'),
    ('User', 'pwd2');

-- Query the data
SELECT * FROM users;
