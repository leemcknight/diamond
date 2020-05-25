import asyncio


class EventEmitter:
	def emitters(self):
		if range(ord('B'), ord('Z')):
			return self.emit_pitch

		return {
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
				'1': self.emit_pickoff,
				'2': self.emit_pickoff,
				'3': self.emit_pickoff,
				'>': self.emit_stealattempt,
				'.': self.emit_play_not_involving_batter,
				'*': self.emit_blocked_pitch,
				'+': self.emit_pickoff_throw_by_catcher
		}

	def emit_pickoff_throw_by_catcher(self, pickoff, game_state):
		print('emitting pickoff throw by catcher'.format(pickoff))

	def emit_blocked_pitch(self, blocked_pitch, game_state):
		print('emitting blocked pitch'.format(blocked_pitch))

	def emit_play_not_involving_batter(self, play, game_state):
		print('emitting play not involving batter'.format(play))

	def emit_stealattempt(self, steal_attempt, game_state):
		print('emitting steal attempt'.format(steal_attempt))

	def emit_pickoff(self, pickoff, game_state):
		print('emitting pickoff: {}'.format(pickoff))

	def emit_pitch(self, pitch, game_state):
		print('emitting pitch: {}'.format(pitch))

	def emit_advance(self, advance, game_state):
		print('emitting advance: {}'.format(advance))

	def emit_play(self, play, game_state):
		print('emitting play: {}'.format(play))
		if(play.startswith('S')):
			game_state['1B'] = game_state['batter']

	def emit_batter(self, batter, game_state):
		game_state['batter'] = batter
		print('batter is now: {}'.format(batter))

	def emit_events(self, event_data, game_state):
		self.emit_batter(event_data[3], game_state)
		pitches = event_data[5]
		for pitch in pitches:
			self.emitters()[pitch](pitch, game_state)
		
		play = event_data[6].split('/')[0]
		self.emit_play(play, game_state)
