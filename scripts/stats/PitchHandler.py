from lookup import get_pitcher
from lookup import get_current_pitcher
import json

class PitchHandler:
        pitchers = {}
        def __init__(self, emitter, game_state):
            emitter.add_handler('pitch', self.pitch_handler)
            emitter.add_handler('K', self.strikeout_handler)
            self._game_state = game_state

        def pitch_handler(self,pitch):
            pitcherId = get_current_pitcher(self._game_state)
            line = get_pitcher(pitcherId, self._game_state)            
            line['pitches'] += 1
            if(pitch != 'B'):
                line['strikes'] += 1
        
        def strikeout_handler(self):
            pitcher = get_current_pitcher(self._game_state)
            line = get_pitcher(pitcher, self._game_state)
            line['strikeOuts'] += 1            
            print(pitcher + " now has " + str(line['strikeOuts']) + " strikeouts.")
        
        def walk_handler(self, pitcher, batter):
            pitcher = get_current_pitcher(self._game_state)
            line = get_pitcher(pitcher, self._game_state)            
            line['walks'] += 1            
            print(pitcher + " now has " + str(line['walks']) + " walks.")

        def write(self):
            file_name = self._game_state['game_id'] + '_pitchers.json'
            f = open(file_name, 'w')
            a = json.dumps(self)
            f.write(a)

class GameHandler: 
    def end_game(self, game_state):
        file_name = game_state['game_id'] + '_game.json'
        f = open(file_name, 'w')
        a = json.dumps(self)
        f.write(a)
            
