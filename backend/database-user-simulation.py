import sqlite3
import random

def get_all_users(db_path):
    """Retrieve all users from the database."""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, username FROM userData ORDER BY id ASC")
    users = cursor.fetchall()
    conn.close()
    return users

def assign_referrals(db_path, users):
    """Assign referrals based on specified percentages and levels."""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    total_users = len(users)
    level_1_count = int(0.05 * total_users)
    level_2_count = int(0.25 * total_users)
    level_3_count = int(0.40 * total_users)
    # Level 4 will take the remaining users

    level_1_users = users[:level_1_count]
    level_2_users = users[level_1_count:level_1_count + level_2_count]
    level_3_users = users[level_1_count + level_2_count:level_1_count + level_2_count + level_3_count]
    level_4_users = users[level_1_count + level_2_count + level_3_count:]

    # Level 2 users get referrals from Level 1
    for user in level_2_users:
        referrer = random.choice(level_1_users)
        cursor.execute("UPDATE userData SET referrer = ? WHERE id = ?", (referrer[1], user[0]))

    # Level 3 users get referrals from Level 2
    for user in level_3_users:
        referrer = random.choice(level_2_users)
        cursor.execute("UPDATE userData SET referrer = ? WHERE id = ?", (referrer[1], user[0]))

    # Level 4 users get referrals from Level 3
    for user in level_4_users:
        referrer = random.choice(level_3_users)
        cursor.execute("UPDATE userData SET referrer = ? WHERE id = ?", (referrer[1], user[0]))

    conn.commit()
    conn.close()

def main():
    db_path = "./src/data-received/database.db"
    
    # Get all users from the database
    users = get_all_users(db_path)

    # Assign referrals based on the specified hierarchy
    assign_referrals(db_path, users)

if __name__ == "__main__":
    main()
