#!/usr/bin python3

import sys
import boto3

dynamo = boto3.resource('dynamodb')


def no_quotes(s):
    return s.replace('"', '')


def buildkey(data):
    parts = data.split(',')
    date = no_quotes(parts[0])
    home_team = no_quotes(parts[6])
    game_number = no_quotes(parts[1])
    return home_team + date + game_number


def load_file(path):
    table = dynamo.Table('diamond')
    with open(path) as gamelogs:
        for gamelog in gamelogs:
            log_row = {}
            log_row['item_key'] = "game"
            log_row['item_name'] = buildkey(gamelog)
            log_row['log'] = no_quotes(gamelog)
            table.put_item(Item=log_row)
            print(log_row['item_name'] + ":" + log_row['log'])


def main():
    path = sys.argv[1]
    load_file(path)


if __name__ == "__main__":
    main()
