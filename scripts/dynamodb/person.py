#!/usr/bin python3

import boto3
import csv


dynamo = boto3.resource('dynamodb')

keymap = {
    'person_id': 'id',
    'last': 'lastName',
    'first': 'firstName',
    'debut': 'debut',
    'mrgdebut': 'managerDebut',
    'coachdebut': 'coachDebut',
    'umpdebut': 'umpireDebut',    
    'notes': 'notes'    
}

def map_keys(item, keymap):
    keys = list(item.keys())
    # key
    item["item_key"] = "person"
    item["item_name"] = item["person_id"]

    for item_key in keys:
        item[keymap[item_key]] = item.pop(item_key)
    return item

def clean_map(item):
    keys = list(item.keys())    
    for item_key in keys:
        if(not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item

with open('data/people/people.csv') as people:
    personreader = csv.DictReader(people)
    table = dynamo.Table('diamond')    
    mapped_keys = [map_keys(item, keymap) for item in personreader]
    cleaned = [clean_map(item) for item in mapped_keys]
    for person in cleaned:
        print(person)
        table.put_item(Item=person)