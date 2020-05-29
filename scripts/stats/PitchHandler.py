from EventEmitter import EventEmitter

def init_pitcher():
	return { 'P': 1, 'K': 0, 'BB': 0 }
class PitchHandler:
		pitchers = {}
		def __init__(self, emitter):
			emitter.add_handler('pitch', self.handler)

		def pitch_handler(self,pitch, pitcher, game_state):
			if(pitcher in self.pitchers.keys()):
					self.pitchers[pitcher]['P'] += 1
			else:
					self.pitchers[pitcher] = init_pitcher()
			print('handling pitch event.')
	 	
		def strikeout_handler(self, pitcher, game_state):
			self.pitchers[pitcher]['K'] += 1
