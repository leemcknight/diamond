#!/usr/bin python3

import boto3
import csv
import sys

dynamo = boto3.resource('dynamodb')


def clean_map(item):
    item['gameId'] = item['homeTeam'] + item['date'] + item['gameNumber']
    item['item_key'] = 'schedule-' + item['date'][0:6]
    item['item_name'] = item['homeTeam'] + item['date'] + item['gameNumber']
    keys = list(item.keys())
    for item_key in keys:
        if (not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item


fieldnames = ['date', 'gameNumber',
              'dayOfWeek', 'visitingTeam', 'visitorLeague', 'visitorGameNumber',
              'homeTeam', 'homeLeague', 'homeGameNumber', 'dayNightIndicator', 'canceled', 'makeupDate']


def load_file(path):
    with open(path) as schedules:
        schedule_reader = csv.DictReader(schedules, fieldnames)
        table = dynamo.Table('diamond')

        cleaned = [clean_map(item) for item in schedule_reader]
        for schedule in cleaned:
            print(schedule)
            table.put_item(Item=schedule)


def main():
    path = sys.argv[1]
    load_file(path)


if __name__ == "__main__":
    main()
