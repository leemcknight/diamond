#!/usr/bin python3

import boto3
import csv


dynamo = boto3.resource('dynamodb')

def clean_map(item):
    keys = list(item.keys())    
    for item_key in keys:
        if(not item[item_key] or not len(item[item_key])):
            item.pop(item_key)
    return item


fieldnames = [
    'currentFranchiseId', 
    'originalFranchiseId',
    'league', 
    'division', 
    'location', 
    'nickname',
    'alternateName', 
    'firstGameDate', 
    'lastGameDate', 
    'city', 
    'state']

def generateFranchiseId(franchise):
    idx = franchise['firstGameDate'].rfind('/')
    year = franchise['firstGameDate'][idx+1:idx+5]
    return franchise['currentFranchiseId'] + year


with open('data/franchises/franchises.csv') as franchises:
    franchise_reader = csv.DictReader(franchises, fieldnames)
    table = dynamo.Table('diamond')

    cleaned = [clean_map(item) for item in franchise_reader]
    for franchise in cleaned:
        franchise['item_key'] = 'franchise'
        franchise['item_name'] = generateFranchiseId(franchise)
        print(franchise)
        table.put_item(Item=franchise)
