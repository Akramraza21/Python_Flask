import sqlite3

connection = sqlite3.connect("data.db")

cursor = connection.cursor()

cursor.execute(
    "CREATE TABLE users (id int primary key,username text,password text)")

# cursor.execute("INSERT INTO user values(1,'take','pass')")

# users = [(2, 'vikas', 'passviki'),
#          (3, 'binod', 'vinod1')]

# cursor.executemany("INSERT INTO user values (?,?,?)", users)

# for item in cursor.execute("SELECT * FROM user"):
#     print(item)

connection.commit()
connection.close()
