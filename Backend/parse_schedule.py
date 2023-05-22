import requests
import xml.etree.ElementTree as ET
import datetime
import json
import redis


class ScheduleParser:
    def __init__(self, url, xml_filename, json_filename):
        self.url = url
        self.xml_filename = xml_filename
        self.json_filename = json_filename
        self.server = redis.Redis(host='localhost', port=6379, db=0)

    def write_to_file(self):
        response = requests.get(self.url)
        with open(self.xml_filename, 'wb') as file:
            file.write(response.content)

    def parse_schedule(self):
        tree = ET.parse(self.xml_filename)
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

    def to_json(self, subjects):
        with open(self.json_filename, 'w') as file:
            json.dump(subjects, file, indent=4, ensure_ascii=False)

    def set_last_modified(self):
        response = requests.head(self.url)
        last_modified = response.headers.get('last-modified')
        self.server.set('last_modified', last_modified)

    def final_parse(self):
        self.set_last_modified()
        self.write_to_file()
        subjects = self.parse_schedule()
        self.to_json(subjects)


URL = "http://rozvrh.fmuk.eu/rozvrh-single/rozvrh_subgroups.xml"
parser = ScheduleParser(URL, 'feed.xml', 'schedule.json')
