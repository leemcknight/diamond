#!/usr/bin/python3
import sys 
from os import listdir
from os.path import isfile, join
from EventEmitter import EventEmitter
from PitchHandler import PitchHandler

emitter = EventEmitter()
game_state = {
        'score': '0-0',
        'players': {
            '0': {},
            '1': {}
        },
        'runners': {},
        'batter': None,
        'inning': 'T1',
        'outs': 0,
        'count': '0-0' 
    }


def start(data):
    player = data[1]
    team = data[3]
    pos = data[5].strip()
    game_state['players'][team][pos] = player
    print("start: {}".format(data))
    

def sub(data):
    print("sub: {}".format(data))

def play(data):
    emitter.emit_events(data, game_state)

def id(data):
    print('Play ball!')
    game_state['game_id'] = data[1].strip()
    game_state['score'] = '0-0'
    game_state['runners'] = {}
    game_state['inning'] = 'T1'
    game_state['outs'] = 0
    game_state['count'] = '0-0'

def info(data):
    type = data[1]

handlers = {
    'play': play,
    'start': start,
    'sub': sub,
    'id': id,
    'info': info,
    'version': lambda data : None,
    'data': lambda data: None,
    'com': lambda data: None
}

def update_context(line):
    data = line.split(',')
    context_handlers[data[0]](line)

def process_file(file):
    print("processing {}".format(file))
    with open(file, 'r') as event_file:
        for event_line in event_file:
            data = event_line.split(',')
            handlers[data[0]](data)

def process_dir(path):
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    for event_file in onlyfiles:
        if event_file.endswith('EVA') or event_file.endswith('EVN'):
            process_file(path + '/' + event_file)

def main(): 
    path = sys.argv[1]
    print("processing {}".format(path))
    print('adding handlers.')
    PitchHandler(emitter)   
    process_dir(path)

if __name__ == "__main__":
    main()
