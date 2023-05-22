import sqlite3


DB_NAME = "mydb.db" 


def get_database_connection(): 
    con = sqlite3.connect(DB_NAME)  
    return con


def create_table():
    return """CREATE TABLE IF NOT EXISTS timetable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher TEXT,
        subject TEXT,
        type TEXT,
        room TEXT,
        subgroup TEXT,
        day TEXT,
        start_time TEXT,
        end_time TEXT
    )"""
    

def insert_data(data):
    con = get_database_connection()
    create_table_query = create_table()

    with con:
        cur = con.cursor()
        cur.execute(create_table_query)

        insert_query = """
        INSERT INTO timetable (teacher, subject, type, room, subgroup, day, start_time, end_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """

        values = [
            (
                entry["teacher"],
                entry["subject"],
                entry["type"],
                entry["room"],
                entry["subgroup"],
                entry["day"],
                entry["start_time"],
                entry["end_time"],
            )
            for entry in data.values()
        ]
        cur.executemany(insert_query, values)
