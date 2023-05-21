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
    cur = con.cursor()
    cur.execute(create_table())
    for i in data:
        cur.execute("INSERT INTO timetable (teacher, subject, type, room, subgroup, day, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (data[i]["teacher"], data[i]["subject"], data[i]["type"], data[i]["room"], data[i]["subgroup"], data[i]["day"], data[i]["start_time"], data[i]["end_time"]))
    con.commit()
    con.close()
