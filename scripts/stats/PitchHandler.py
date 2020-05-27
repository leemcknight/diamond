from EventEmitter import EventEmitter

class PitchHandler:
		pitchers = {}
		def __init__(self, emitter):
			emitter.add_handler('pitch', self.handler)

		def handler(self,pitch, pitcher, game_state):
			pitchers[pitcher].pitches += 1
			print('handling pitch event.')
			print('pitching stats: {}'.format(pitchers))
