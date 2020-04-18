import boto3
import csv
import sys
from os import listdir
from os.path import isfile, join

dynamo = boto3.resource('dynamodb')

def clean_map(item):
    keys = list(item.keys())
    for item_key in keys:
        if(not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item


def load_dir(path):
    print(path)
    table = dynamo.Table('game')
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    for file in onlyfiles:
        qualified = path + '/' + file
        with open(qualified) as game_file:
            game = {}
            game['data'] = game_file.read()
            game['game_id'] = file.split('.')[0]
            table.put_item(Item=game)            

def main():
    path = sys.argv[1]
    load_dir(path)
        
if __name__ == "__main__":
    main()