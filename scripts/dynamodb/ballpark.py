#!/usr/bin python3

import boto3
import csv


dynamo = boto3.resource('dynamodb')

def map_keys(item, keymap):
    keys = list(item.keys())
    # key
    item["item_key"] = "ballpark"
    item["item_name"] = item["PARKID"]

    for item_key in keys:
        item[keymap[item_key]] = item.pop(item_key)
    return item

def clean_map(item):
    keys = list(item.keys())
    for item_key in keys:
        if(not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item

#Header will have the following columns defined:
#PARKID,NAME,AKA,CITY,STATE,START,END,LEAGUE,NOTES

keymap = {
    'PARKID': 'id',
    'NAME': 'name',
    'AKA': 'aka',
    'CITY': 'city',
    'STATE': 'state',
    'START': 'startDate',
    'END': 'endDate',
    'LEAGUE': 'league',
    'NOTES': 'notes'    
}

with open('data/ballparks/parkcode.txt') as ballparks:
    ballparkreader = csv.DictReader(ballparks)
    table = dynamo.Table('diamond')

    mapped_keys = [map_keys(item, keymap) for item in ballparkreader]
    cleaned = [clean_map(item) for item in mapped_keys]
    for ballpark in cleaned:
        print(ballpark)
        table.put_item(Item=ballpark)
