import mysql.connector

# Define the connection parameters
host = "13.51.162.170"
user = "root"
password = "pwd"
database = "your_database"

# Establish the connection
try:
    connection = mysql.connector.connect(
        host=host, user=user, password=password, database=database
    )

    if connection.is_connected():
        print(f"Connected to MySQL database: {database}")
        # Now you can execute queries here
        # Create a cursor object to execute queries
        cursor = connection.cursor()

        # Example: execute a SELECT query
        query = "SELECT * FROM users"
        cursor.execute(query)

        # Fetch and print the results
        results = cursor.fetchall()
        for row in results:
            print(row)
    else:
        print("Connection failed.")

except Exception as e:
    print(f"Error: {e}")
finally:
    # Close the connection when done
    if "connection" in locals():
        connection.close()
