import boto3
import csv
import sys

dynamo = boto3.resource('dynamodb')

def clean_map(item):
    item['year_month'] = item['date'][0:6] 
    item['game_id'] = item['home'] + item['date'] + item['game_number']
    keys = list(item.keys())
    for item_key in keys:
        if(not item[item_key] or not len(item[item_key])):
            item.pop(item_key)    
    return item


fieldnames = ['date', 'game_number', 
                'day_of_week', 'visitor', 'visitor_league', 'visitor_game_number', 
                'home', 'home_league', 'home_game_number', 'day_night_ind', 'cancel_ind', 'makeup_date']

            
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