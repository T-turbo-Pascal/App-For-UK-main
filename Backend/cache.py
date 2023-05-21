import redis
from parse_schedule import final_parse, URL, set_last_modified, server
import db
import json
import requests


try:
    server.ping()
    print('[OK] Redis connected')
except redis.exceptions.ConnectionError:
    print('[ERROR] Redis not connected')


def is_schedule_updated(URL):
    response = requests.head(URL)
    last_modified = response.headers.get('last-modified')

    if last_modified:
        stored_last_modified = server.get('last_modified')

        if stored_last_modified and stored_last_modified.decode('utf-8') == last_modified:
            return False
        else:
            server.set('last_modified', last_modified)
            return True
    else:
        return True
    

def main():
    if is_schedule_updated(URL):
        print('Schedule has been updated')
        final_parse()
        set_last_modified(URL)
        data = json.load(open("schedule.json", "r", encoding="utf-8"))
        db.insert_data(data)

    else:
        print('Schedule has not been updated')


if __name__ == '__main__':
    main()

