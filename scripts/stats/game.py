import sys 
from os import listdir
from os.path import isfile, join
from EventEmitter import EventEmitter
from PitchHandler import PitchHandler
from BatterHandler import BatterHandler
from boxscore.hitting_line import HittingLine
from boxscore.pitching_line import PitchingLine
from boxscore.box_score import BoxScore

class Game:        
    def __init__(self, emitter, data):                    
        self._emitter = emitter
        self._game_state = self._initialize_game_state()        
        self._box_score = None

    def _initialize_game_state(self):
        return {
            'score': '0-0',
            'players': {
                '0': {},
                '1': {}
            },
            'runners': {},
            'batter': None,
            'inning': 'T1',
            'outs': 0,
            'count': '0-0',                
        }
    
    def print_box_score(self):
        self._box_score.print()

    def add_player_to_starting_lineup(self, data):
        if self._box_score is None:
            self._box_score = BoxScore(self._game_state['visteam'], self._game_state['hometeam'])
        print(data)
        team = data[3]
        spot = data[4]
        pos = data[5].strip()
        player = data[1]
                
        self._game_state['players'][team][pos[0]] = player
        self._box_score.add_player(team, player, pos, spot)        

    def play(self, data):
        print("New Play: {}".format(data))        
        self._emitter.emit_events(data, self._game_state, self._box_score)          

    def info(self, k, v):
        self._game_state[k] = v

    def sub(self, data):
        print("sub: {}".format(data))        
        new_player = data[1]
        spot = data[4]
        pos = data[5].strip()
        team = data[3]
        
        # is it the pitcher
        is_pitcher = spot == "1"

        # is the player being dh'd (not batting)
        # if the batting position is 0 they are not batting (DH will bat for them)
        # typically this means they are the pitcher, but not always.
        is_batting = pos != "0"

        # if they are batting, create a batter stat line
        if is_batting:                        
            self._box_score.sub_player(team, new_player, pos, spot)            
        
        if is_pitcher:            
            self._box_score.sub_pitcher(team, new_player)        
        self._game_state['players'][team][pos] = new_player

    