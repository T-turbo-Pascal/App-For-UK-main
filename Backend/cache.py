import requests
from redis.exceptions import ConnectionError
import json
from parse_schedule import parser, URL
from db import insert_data

def check_redis_connection():
    try:
        parser.server.ping()
        print('[OK] Redis connected')
        return True
    except ConnectionError:
        print('[ERROR] Redis not connected')
        return False


def is_schedule_updated(url):
    response = requests.head(url)
    last_modified = response.headers.get('last-modified')

    if last_modified:
        stored_last_modified = parser.server.get('last_modified')

        if stored_last_modified and stored_last_modified.decode('utf-8') == last_modified:
            return False
        else:
            parser.server.set('last_modified', last_modified)
            return True
    else:
        return True


def main():
    if not check_redis_connection():
        return

    if is_schedule_updated(URL):
        print('Schedule has been updated')
        parser.final_parse()
        with open("schedule.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            insert_data(data)
    else:
        print('Schedule has not been updated')


if __name__ == '__main__':
    main()
