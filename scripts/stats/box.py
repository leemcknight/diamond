#!/usr/bin/python3
import sys
from os import listdir
from os.path import isfile, join
from EventEmitter import EventEmitter
from PitchHandler import PitchHandler
from BatterHandler import BatterHandler
from game import Game


game: Game = None
emitter = EventEmitter()


def play(data):
    game.play(data)


def com(data):
    print(data)


def start(data):
    game.add_player_to_starting_lineup(data)


def sub(data):
    game.sub(data)


def id(data):
    global game
    if game is not None:
        print("Game Ended.")
        print("BOX SCORE:")
        game.print_box_score()
        sys.exit(0)

    game = Game(emitter, data)
    print('Play ball!')


def info(data):
    game.info(data[1], data[2])


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


handlers = {
    'play': play,
    'start': start,
    'sub': sub,
    'id': id,
    'info': info,
    'version': lambda data: None,
    'data': lambda data: None,
    'com': com
}


def main():
    path = sys.argv[1]
    print("processing {}".format(path))
    print('adding handlers.')
    process_dir(path)


if __name__ == "__main__":
    main()
