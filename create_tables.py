import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()

cursor.execute(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY,username text,password text)")

connection.commit()
connection.close()
