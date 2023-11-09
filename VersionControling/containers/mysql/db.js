const mysql = require("mysql");

// Define the connection parameters
const connection = mysql.createConnection({
  host: "0.0.0.0",
  user: "root",
  password: "pwd",
  database: "your_database",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Execute a query
const query = "SELECT * FROM users";

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error("Error executing query:", error);
    return;
  }

  console.log("Query results:", results);

  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error("Error closing connection:", err);
      return;
    }
    console.log("Connection closed");
  });
});
