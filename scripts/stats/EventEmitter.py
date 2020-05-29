import asyncio


class EventEmitter:
	handlers = {'pitch': []}

	def emitter(self, event_code):
		if ord(event_code) in range(ord('B'), ord('Z')):
			return self.emit_pitch
		if event_code.isnumeric():  
			return self.emit_pickoff
		return {
				'>': self.emit_stealattempt,
				'.': self.emit_play_not_involving_batter,
				'*': self.emit_blocked_pitch,
				'+': self.emit_pickoff_throw_by_catcher
		}[event_code]

	def add_handler(self, event, handler):
		self.handlers[event].append(handler)

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
		pitcher_index = '1' if game_state['inning'][0] == 'T' else '0'
		pitcher = game_state['players'][pitcher_index]['1']
		for handler in self.handlers['pitch']:
			handler(pitch,pitcher, game_state)
		balls = int(game_state['count'].split('-')[0])
		strikes = int(game_state['count'].split('-')[1])
		if(pitch in 'SC'):
			strikes += 1
		elif(pitch in 'BIPV'):
			balls += 1
		game_state['count'] = str(balls) + '-' + str(strikes)
		print('count now {}'.format(game_state['count']))

	def emit_advance(self, advance, game_state):
		print('emitting advance: {}'.format(advance))
		start_base = advance.split('-')[0]
		end_base = advance.split('-')[1]
		runner = game_state.runners['start_base']
		if (end_base == 'H'):
			emit_run(runner, game_state)

	def emit_run(self, scorer, game_state):
		print('emitting run for: {}'.format(scorer))

	def emit_play(self, play, game_state):
		print('emitting play: {}'.format(play))
		if(play.startswith('S')):
			game_state['runners']['1'] = game_state['batter']
		elif (play.startswith('D')):
			game_state['runners']['2'] = game_state['batter']
		elif (play.startswith('T')):
			game_state['runners']['3'] = game_state['batter']
		elif (play.startswith('H')):
			self.emit_run(game_state['batter'], game_state)

	def emit_batter(self, batter, game_state):
		game_state['batter'] = batter
		game_state['count'] = '0-0'
		print(game_state)
		print('batter is now: {}'.format(batter))

	def emit_events(self, event_data, game_state):
		self.emit_batter(event_data[3], game_state)
		pitches = event_data[5]
		for pitch in pitches:
			self.emitter(pitch)(pitch, game_state)
		
		play = event_data[6].split('/')[0]
		self.emit_play(play, game_state)
