import sqlite3
import csv
import random

def generate_username(word, iteration):
    """Generate a username with two random numbers appended, using iteration to ensure uniqueness."""
    random.seed()  # Ensure fresh random numbers for each call
    return f"{word}{random.randint(10, 99)}{random.randint(10, 99)}{iteration}"

def read_words_from_csv(file_path):
    """Read words from a CSV file, assuming each word is on a new line."""
    with open(file_path, newline='') as csvfile:
        reader = csv.reader(csvfile)
        return [row[0] for row in reader]

def create_or_reset_table(conn):
    """Create or reset the userData table."""
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS userData")
    cursor.execute("""
        CREATE TABLE userData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            referrer TEXT,
            referrerlink TEXT,
            referrerID TEXT,
            newUser TEXT,
            newUserID TEXT,
            sessionID TEXT,
            userIP TEXT,
            timestamp TEXT
        )
    """)
    conn.commit()

def insert_users_to_db(db_path, words):
    """Insert users into the userData table."""
    conn = sqlite3.connect(db_path)
    create_or_reset_table(conn)  # Reset and recreate the userData table
    cursor = conn.cursor()

    iteration = 0
    for _ in range(650):  # Ensure 650 entries
        word = random.choice(words)  # Choose a random word for each username
        username = generate_username(word, iteration)
        newUser = f"{username}@gmail.com"
        # Inserting the user into the database
        try:
            cursor.execute("INSERT INTO userData (username, newUser) VALUES (?, ?)", (username, newUser))
        except sqlite3.IntegrityError as e:
            print(f"Error inserting username: {username}, Error: {e}")
            continue  # In case of an error, try the next iteration without incrementing

        iteration += 1  # Increment iteration after a successful insert

    conn.commit()
    conn.close()

def main():
    db_path = "./src/data-received/database.db"
    words_csv_path = "words.csv"
    
    # Read words from the CSV file
    words = read_words_from_csv(words_csv_path)

    # Insert users into the database
    insert_users_to_db(db_path, words)

if __name__ == "__main__":
    main()
