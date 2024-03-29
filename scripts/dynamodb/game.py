#!/usr/bin python3

import boto3
import csv
import sys
from os import listdir
from os.path import isfile, join

dynamo = boto3.resource('dynamodb')


def clean_map(item):
    keys = list(item.keys())
    for item_key in keys:
        if (not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item


def load_dir(path):
    print(path)
    table = dynamo.Table('diamond')
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    for file in onlyfiles:
        qualified = path + '/' + file
        with open(qualified) as game_file:
            game_data = game_file.read()
            game_id = file.split('.')[0]
            update_expr = 'set gameData = :d'
            vals = {':d': game_data}
            print(game_id)
            table.update_item(Key={'item_key': 'game', 'item_name': game_id}, UpdateExpression=update_expr,
                              ExpressionAttributeValues=vals, ReturnValues='UPDATED_NEW')


def main():
    path = sys.argv[1]
    load_dir(path)


if __name__ == "__main__":
    main()
