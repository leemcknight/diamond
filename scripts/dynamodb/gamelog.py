import sys;
import boto3;

dynamo = boto3.resource('dynamodb')

def no_quotes(s):
    return s.replace('"','')

def buildkey(data):
    parts = data.split(',')
    date = no_quotes(parts[0])
    home_team = no_quotes(parts[6]) 
    game_number = no_quotes(parts[1]) 
    return home_team + date + game_number

def load_file(path):
    table = dynamo.Table('game')
    with open(path) as gamelogs:
        for gamelog in gamelogs:
            log_row = {}
            log_row['game_id'] = buildkey(gamelog)
            log_row['log'] = no_quotes(gamelog)
            table.put_item(Item=log_row)
            print(log_row['game_id'] + ":" + log_row['log'])


def main():
    path = sys.argv[1]
    load_file(path)
        
if __name__ == "__main__":
    main()
