import asyncio


class EventEmitter:
    handlers = {'pitch': [], 'K': []}

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
        print('Here comes the pitch...')
        pitcher_index = '1' if game_state['inning'][0] == 'T' else '0'
        pitcher = game_state['players'][pitcher_index]['1']
        for handler in self.handlers['pitch']:
            handler(pitch, pitcher, game_state)
        balls = int(game_state['count'].split('-')[0])
        strikes = int(game_state['count'].split('-')[1])
        if(pitch in 'SC'):
            strikes += 1
            if(pitch == 'S'):
                print('Swung on and missed.')
            elif(pitch == 'C'):
                print('Called Strike.')
        elif(pitch in 'BIPV'):
            print('ball.')
            balls += 1
        elif(pitch == 'F'):
            print('Fouled off.')
            if(strikes < 2):
                strikes += 1
        game_state['count'] = str(balls) + '-' + str(strikes)
        print('Count now {}'.format(game_state['count']))

    def emit_advance(self, advance, game_state):
        print('emitting advance: {}'.format(advance))
        print('runners state before advance: {}'.format(game_state['runners']))
        if('X' in advance):
            print('emitting out on advance')
            players = advance.split('X')
            assister = players[0]
            put_out = players[1]
            self.emit_out(game_state) 
        else:
            start_base = advance.split('-')[0].strip()
            end_base = advance.split('-')[1].strip()[0:1]
            runner = game_state['runners'][start_base]
            game_state['runners'].pop(start_base)
            if (end_base == 'H'):
                self.emit_run(runner, game_state)
            else:
                game_state['runners'][end_base] = runner
            print('runners now: {}'.format(game_state['runners']))

    def emit_modifier(self, modifier, game_state):
        print('emitting modifier: {}'.format(modifier))
  
    def next_inning(self, game_state):
        inning = game_state['inning']        
        inning_number = inning[1:len(inning)] 
        top_bottom = ''
        if(inning[0:1] == 'T'):
            game_state['inning'] = 'B' + inning_number
            top_bottom = 'bottom'
        else:
            game_state['inning'] = 'T' + str(int(inning_number) + 1)
            top_bottom = 'top'
        game_state['outs'] = 0
        print('We move to the {} of the {}.'.format(top_bottom, game_state['inning']))

    def emit_out(self, game_state):
        outs = int(game_state['outs'])
        outs += 1
        game_state['outs'] = outs
        print('There are now {} outs.'.format(outs))
        if(outs == 3):
            self.next_inning(game_state)

    def emit_run(self, scorer, game_state):
        print('a run scores. {} crosses the plate.'.format(scorer))
        runs = game_state['score'].split('-')
        visitor_runs = int(runs[0])
        home_runs = int(runs[1])   
        if(game_state['inning'].startswith('T')):
            visitor_runs += 1
        else:
            home_runs += 1
        score = '{}-{}'.format(visitor_runs, home_runs)
        game_state['score'] = score
        print('score is now: {}'.format(game_state['score']))

    def emit_walk(self, play, game_state):
        print('Walked him.')
        game_state['runners']['1'] = game_state['batter']

    def emit_hit_by_pitch(self, play, game_state):
        print('Hit by pitch.')
        game_state['runners']['1'] = game_state['batter']

    def emit_strikeout(self, play, game_state):
        print('Struck him out.')
        pitcher = self.get_pitcher(game_state)
        self.emit_out(game_state)
        for handler in self.handlers['K']:
            handler(pitcher, game_state)

    def emit_play(self, play, game_state):
        print('emitting play: {}'.format(play))
        if(play.startswith('S')):
            game_state['runners']['1'] = game_state['batter']
        elif(play.startswith('W')):
            self.emit_walk(play, game_state)
        elif (play.startswith('D')):
            game_state['runners']['2'] = game_state['batter']
        elif (play.startswith('T')):
            game_state['runners']['3'] = game_state['batter']
        elif(play.startswith('HP')):
            self.emit_hit_by_pitch(play, game_state)
        elif (play.startswith('H')):
            self.emit_run(game_state['batter'], game_state)
        elif(play.startswith('IW')):
            game_state['runners']['1'] = game_state['batter']      
        elif(play.startswith('K')):
            self.emit_strikeout(play, game_state)

    def emit_batter(self, batter, game_state):
        game_state['batter'] = batter
        game_state['count'] = '0-0'
        game_state['runners']['B'] = batter
        print(game_state)
        print('batter is now: {}'.format(batter))

    def get_pitcher(self, game_state):
        if game_state['inning'].startswith('T'):
            return game_state['players']['1']['1']
        return game_state['players']['0']['1']

    def emit_events(self, event_data, game_state):
        self.emit_batter(event_data[3], game_state)
        pitches = event_data[5]
        for pitch in pitches:
            self.emitter(pitch)(pitch, game_state)
        
        play = event_data[6]
        desc = play.split('/')[0]
        modifiers_and_advances = play.split('.')
        modifiers = modifiers_and_advances[0]
        if len(modifiers_and_advances) > 1:
            advances = modifiers_and_advances[1].split(';')
            for modifier in modifiers:
                self.emit_modifier(modifier, game_state)
            for advance in advances:
                self.emit_advance(advance, game_state)
        self.emit_play(desc, game_state)
