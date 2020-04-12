import boto3
import csv


dynamo = boto3.resource('dynamodb')

def clean_map(item):
    keys = list(item.keys())
    for item_key in keys:
        if(not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item

with open('data/people/people.csv') as people:
    personreader = csv.DictReader(people)
    table = dynamo.Table('person')    
    cleaned = [clean_map(item) for item in personreader]
    for person in cleaned:
        print(person)
        table.put_item(Item=person)