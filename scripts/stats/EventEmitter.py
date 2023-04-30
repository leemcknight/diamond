import asyncio
from positions import Positions
from lookup import get_current_pitcher

class EventEmitter:
    handlers = {'pitch': [], 'K': [], 'BB': [], '1B': [], '2B': [], '3B': [],'HR': [], 'E':[], }
    positions = Positions()

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

    def emit_pickoff_throw_by_catcher(self, pickoff, game_state, box_score):
        print('emitting pickoff throw by catcher'.format(pickoff))

    def emit_blocked_pitch(self, blocked_pitch, game_state, box_score):
        print('emitting blocked pitch'.format(blocked_pitch))

    def emit_play_not_involving_batter(self, play, game_state, box_score):
        print('emitting play not involving batter'.format(play))

    def emit_stealattempt(self, steal_attempt, game_state, box_score):
        print('runner goes!')

    def emit_pickoff(self, pickoff, game_state, box_score):
        print('emitting pickoff: {}'.format(pickoff))

    def emit_pitch(self, pitch, game_state, box_score):        
        pitcher_index = '1' if game_state['inning'][0] == 'T' else '0'        
        pitcher = game_state['players'][pitcher_index]['1']        
        pitching_line = box_score.get_pitching_line(pitcher_index).current_reliever()
        
        for handler in self.handlers['pitch']:
            handler(pitch, pitcher, game_state)
        balls = int(game_state['count'].split('-')[0])
        strikes = int(game_state['count'].split('-')[1])
        is_strike = False
        if(pitch in 'SC'):
            strikes += 1 
            is_strike = True           
        elif(pitch in 'BIPV'):            
            balls += 1
        elif(pitch == 'F'):
            is_strike = True
            if(strikes < 2):
                strikes += 1
        elif(pitch == 'X'):
            is_strike = True            
        
        pitching_line.pitch(is_strike)
        game_state['count'] = str(balls) + '-' + str(strikes)        

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
        game_state['runners'] = {}
        print('----------------------')
        print('We move to the {} of the {}.'.format(top_bottom, game_state['inning']))

    def emit_out(self, game_state, box_score):
        outs = int(game_state['outs'])
        outs += 1
        pitching_team = '1' if game_state['inning'][0] == 'T' else '0'
        line = box_score.get_pitching_line(pitching_team)
        line.record_out()
        game_state['outs'] = outs
        print('There are now {} outs.'.format(outs))
        if(outs == 3):
            self.next_inning(game_state)

    def emit_run(self, scorer, game_state):
        print('A run scores. {} crosses the plate.'.format(scorer))
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
        pitcher_index = '1' if game_state['inning'][0] == 'T' else '0'
        pitcher = game_state['players'][pitcher_index]['1']
        game_state['runners']['1'] = game_state['batter']
        for handler in self.handlers['BB']:
            handler(pitcher, game_state['runners']['1'], game_state)

    def emit_hit_by_pitch(self, play, game_state):
        print('Hit by pitch.')
        game_state['runners']['1'] = game_state['batter']

    def emit_strikeout(self, play, game_state, box_score):
        print('Struck him out.')                
        for handler in self.handlers['K']:
            handler(game_state)        
        self.emit_out(game_state, box_score)

    def emit_stolen_base(self, play, game_state):
        stolen_base = play[2:3]
        next_base = int(stolen_base)
        prev_base = next_base - 1
        runner = game_state['runners'][str(prev_base)]
        print('{} safe at {} with a stolen base.'.format(runner, stolen_base))
        game_state['runners'][stolen_base] = runner
        game_state['runners'][str(prev_base)] = None

    def emit_homerun(self, play, game_state, box_score):
        print('{} homers!'.format(game_state['batter']))                
        self.emit_run(game_state['batter'], game_state)        
 
    def parse_outs(self, play, game_state, box_score):        
        #check for fielder's choice
        if play.startswith('FC'):
            pos = play[2:3]
            print('pos: {}'.format(pos))
            print('batter reaches on a fielders choice.  Out made by {}'.format(self.positions.get_player_and_position(pos, game_state)))
        else:            
            unassisted = True
            last = ""            
            next_is_runner_out = False
            print("out on a play from {}".format(self.positions.get_player_and_position(play[0], game_state)))
            for idx in range(0, len(play)):                                
                c = play[idx]
                if(c == "("):
                    next_is_runner_out = True                
                elif(c == ")"):
                    next_is_runner_out = False
                elif next_is_runner_out:
                    # "c" is the runner forced on this play
                    next_is_runner_out = False
                    print("Runner from {} is out.".format(c))
                    # self.emit_out(game_state)
                else:
                    next_is_runner_out = False
                    fielder = self.positions.get_player_and_position(play[idx], game_state)
                    if idx > 0:
                        unassisted = False
                        print(" to {}".format(fielder))       
                        self.emit_out(game_state, box_score)         
                last = play[idx]
            
            if unassisted:
                if int(last) < 7:                
                    print(" + Unassisted.")
                self.emit_out(game_state, box_score)
                
            
        #self.emit_out(game_state)
        
    def emit_play(self, play, game_state, box_score):      
        print("play {}".format(play))  
        team = '0' if game_state['inning'][0] == 'T' else '1'
        pitching_team = '1' if game_state['inning'][0] == 'T' else '0'
        batting_line = box_score.get_hitting_line(team, game_state['batter'])
        pitching_line = box_score.get_pitching_line(pitching_team)
        if(play.startswith('SB')):
            self.emit_stolen_base(play, game_state)
        elif(play.startswith('S')):
            batting_line.single()
            pitching_line.hit()
            self.emit_single(play, game_state, box_score)
        elif(play.startswith('CS')):
            print("caught stealing.")
            self.emit_out(game_state, box_score)
        elif(play.startswith('W')):
            pitching_line.walk()
            batting_line.walk()
            self.emit_walk(play, game_state)
        elif(play.startswith('E')):
            print('{} reaches on an error by {}'
                            .format(game_state['batter'], 
                                    self.positions.get_player_and_position(play[1:2], game_state)))
            game_state['runners']['1'] = game_state['batter']
        elif(play.startswith('C')):
            print('catchers interference.  batter awarded first base')
            game_state['runners']['1'] = game_state['batter']
        elif(play.startswith('DGR')):
            batting_line.double()
            print('{} hits a ground rule double.'.format(game_state['batter']))
            game_state['runners']['2'] = game_state['batter']
        elif(play.startswith('DI')):
            print('Runner Advances from on defensive indifference')
        elif (play.startswith('D')):
            pitching_line.hit()
            batting_line.double()
            print('{} doubles to {}'.format(game_state['batter'], self.positions.get_player_and_position(play[1:2], game_state)))
            game_state['runners']['2'] = game_state['batter']
        elif (play.startswith('T')):
            pitching_line.hit()
            batting_line.triple()
            print('{} triples to {}'.format(game_state['batter'], self.positions.get_player_and_position(play[1:2], game_state)))
            game_state['runners']['3'] = game_state['batter']
        elif(play.startswith('FC')):
            print('{} reaches on a fielders choice.'.format(game_state['batter']))
            game_state['runners']['1'] = game_state['batter']
            self.parse_outs(play, game_state)
        elif(play.startswith('HP')):
            self.emit_hit_by_pitch(play, game_state)
        elif (play.startswith('H')):
            pitching_line.homerun()
            batting_line.homerun()
            self.emit_homerun(play, game_state)
        elif(play.startswith('IW')):
            pitching_line.walk()
            batting_line.walk()
            game_state['runners']['1'] = game_state['batter']      
        elif(play.startswith('K')):
            pitching_line.strikeout(False)
            batting_line.strikeout()
            self.emit_strikeout(play, game_state, box_score)
        elif(play.startswith('NP')):
            print('No play.')
        elif(play.startswith('OA')):
            print('Baserunning play.')
        elif(play.startswith('PB')):
            print('Passed ball.')
        elif(play.startswith('PO')):
            self.emit_pickoff(play, game_state, box_score)
        elif(play.startswith('BK')):
            print('Balk')
        elif(play.startswith('FL')):
            print('Fouled off, play: ')
        else:
            self.parse_outs(play, game_state, box_score)

    def emit_batter(self, batter, game_state):
        game_state['batter'] = batter
        game_state['count'] = '0-0'
        game_state['runners']['B'] = batter        
        print('batter is now: {}'.format(batter))

    def emit_single(self, play, game_state, box_score):
        print('{} singles to {}.'.format(game_state['batter'], self.positions.get_player_and_position(play[1:2], game_state)))        
        game_state['runners']['1'] = game_state['batter']

    def emit_events(self, event_data, game_state, box_score):        
        self.emit_batter(event_data[3], game_state)
        pitches = event_data[5]
        for pitch in pitches:
            self.emitter(pitch)(pitch, game_state, box_score)
        play = event_data[6]
        desc = play.split('/')[0]
        plays_modifiers_and_advances = play.split('.')
        plays_and_modifiers = plays_modifiers_and_advances[0].split('/')
        if len(plays_modifiers_and_advances) > 1:
            advances = plays_modifiers_and_advances[1].split(';')
            if(len(plays_and_modifiers) > 1):
                modifiers = plays_and_modifiers[1].split('/')
                for modifier in modifiers:
                    self.emit_modifier(modifier.strip(), game_state)
            for advance in advances:
                self.emit_advance(advance, game_state)
        play_parts = desc.split('+')
        for part in play_parts:
            self.emit_play(part, game_state, box_score)
