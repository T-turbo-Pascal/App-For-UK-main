import requests
import xml.etree.ElementTree as ET
import datetime
import json
import redis


URL = "http://rozvrh.fmuk.eu/rozvrh-single/rozvrh_subgroups.xml"
server = redis.Redis(host='localhost', port=6379, db=0)


def write_to_file():
    response = requests.get(URL)
    with open('feed.xml', 'wb') as file:
        file.write(response.content)


def parse_schedule():
    tree = ET.parse('feed.xml')
    root = tree.getroot()
    activity_id = 0
    subjects = {}

    for subgroup in root.iter('Subgroup'):
        subgroup_name = subgroup.attrib['name']

        for day in subgroup.iter('Day'):
            day_name = day.attrib['name']

            for hour in day.iter('Hour'):
                start_time = hour.attrib['name']
                end_time = (datetime.datetime.strptime(start_time, '%H:%M') + datetime.timedelta(minutes=45)).strftime('%H:%M')

                activity = hour.find('Activity')
                teacher = hour.find('Teacher')
                subject = hour.find('Subject')
                tag = hour.find('Activity_Tag')
                room = hour.find('Room')

                if activity is not None:
                    teacher_name = teacher.attrib['name']
                    subject_name = subject.attrib['name']
                    tag_name = tag.attrib['name']
                    room_name = room.attrib['name']

                    subjects[activity_id] = {
                        'teacher': teacher_name,
                        'subject': subject_name,
                        'type': tag_name,
                        'room': room_name,
                        'subgroup': subgroup_name,
                        'day': day_name,
                        'start_time': start_time,
                        'end_time': end_time,
                    }
                    activity_id += 1

    return subjects


def to_json(subjects):
    with open('schedule.json', 'w') as file:
        json.dump(subjects, file, indent=4, ensure_ascii=False)


def set_last_modified(URL):
    response = requests.head(URL)
    last_modified = response.headers.get('last-modified')
    server.set('last_modified', last_modified)


def final_parse():
    set_last_modified(URL)
    write_to_file()
    subjects = parse_schedule()
    to_json(subjects)

