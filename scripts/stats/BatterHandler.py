from lookup import get_batter

class BatterHandler:    
    batters = {}

    def __init__(self, emitter):            
            emitter.add_handler('K', self.strikeout_handler)

    def strikeout_handler(self, game_state):        
        line = get_batter(game_state['batter'], game_state)
        line['strikeOuts'] += 1        
                  