import asyncio

class EventEmitter:
	def emit_pitch(self, pitch):
		print('emitting pitch: {}'.format(pitch))

	def emit_events(self, event_string):
		parts = event_string.split(',')
		if parts[0] == 'play': 
				pitches = parts[5]
				for pitch in pitches:
					self.emit_pitch(pitch) 
