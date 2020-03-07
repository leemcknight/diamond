import boto3
import csv


dynamo = boto3.resource('dynamodb')

def clean_map(item):
    keys = list(item.keys())
    for item_key in keys:
        if(not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item


fieldnames = ['current_franchise_id', 'original_franchise_id', 
                'league', 'division', 'location', 'nickname', 
                'alt', 'first_game', 'last_game', 'city', 'state']

def generateFranchiseId(franchise):
    idx = franchise['first_game'].rfind('/')
    year = franchise['first_game'][idx+1:idx+5]
    return franchise['current_franchise_id'] + year
            

with open('data/franchises/franchises.csv') as franchises:
    franchise_reader = csv.DictReader(franchises, fieldnames)
    table = dynamo.Table('franchise')

    cleaned = [clean_map(item) for item in franchise_reader]
    for franchise in cleaned:
        franchise['franchise_id'] = generateFranchiseId(franchise)
        print(franchise)
        table.put_item(Item=franchise)