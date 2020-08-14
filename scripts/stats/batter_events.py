class BatterEvents:

    def get_event(play, game_state):
       print('getting event for {}'.format(play)) 

    def parse_play(play, game_state):
        if(play.startsWith('S')):
            print('single.')
        elif(play.startsWith('D')):
            print('double.')
        elif(play.startsWith('T')):
            print('triple.')
        if(len(play) == 1):
            
