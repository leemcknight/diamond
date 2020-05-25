import asyncio


class EventEmitter:
	emitters = {
		'B': self.emit_pitch,
		'C': self.emit_pitch,
		'F': self.emit_pitch,
		'H': self.emit_pitch,
		'I': self.emit_pitch,
		'K': self.emit_pitch,
		'L': self.emit_pitch,
		'M': self.emit_pitch,
		'N': self.emit_pitch,
		'O': self.emit_pitch,
		'P': self.emit_pitch,
		'Q': self.emit_pitch,
		'R': self.emit_pitch,
		'S': self.emit_pitch,
		'T': self.emit_pitch,
		'U': self.emit_pitch,
		'V': self.emit_pitch,
		'X': self.emit_pitch,
		'Y': self.emit_pitch,
		}
	def emit_pitch(self, pitch, fieldstate):
		print('emitting pitch: {}'.format(pitch))

	def emit_advance(self, advance, fieldstate):
		print('emitting advance: {}'.format(advance))

	def emit_play(self, play, fieldstate):
		print('emitting play: {}'.format(play))

	def emit_batter(self, batter, fieldstate):
		print('batter is now: {}'.format(batter)

	def emit_events(self, event_data, fieldstate):
		emit_batter(event_data[3], fieldstate)
		pitches = event_data[5]
		for pitch in pitches:
			emitters[pitch](pitch, fieldstate)
			#self.emit_pitch(pitch, fieldstate) 
		
		play = event_data[6].split('/')[0]
		self.emit_play(play, fieldstate)
