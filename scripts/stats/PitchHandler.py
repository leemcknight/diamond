from EventEmitter import EventEmitter
import json

def init_pitcher():
	return { 'P': 1, 'K': 0, 'BB': 0 }
class PitchHandler:
		pitchers = {}
		def __init__(self, emitter):
			emitter.add_handler('pitch', self.pitch_handler)
			emitter.add_handler('K', self.strikeout_handler)

		def pitch_handler(self,pitch, pitcher, game_state):
			if(pitcher in self.pitchers.keys()):
					self.pitchers[pitcher]['P'] += 1
			else:
					self.pitchers[pitcher] = init_pitcher()
			print('handling pitch event.')
	 	
		def strikeout_handler(self, pitcher, game_state):
			self.pitchers[pitcher]['K'] += 1

		def write(self, game_state):
			file_name = game_state['game_id'] + '_pitchers.json'
			f = open(file_name, 'w')
			a = json.dumps(self)
			f.write(a)

class GameHandler: 
	def end_game(self, game_state):
		file_name = game_state['game_id'] + '_game.json'
		f = open(file_name, 'w')
		a = json.dumps(self)
		f.write(a)
			
