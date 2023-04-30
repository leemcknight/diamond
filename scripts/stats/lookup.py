
def find(id: str, line):
    if(line['name'] == id):
        return line
    for subline in line['subs']:
        sub = find(id, subline)
        if sub is not None:
            return sub    
    return None
    

def get_batter(id: str, game_state):        
    print("getting batter: " + id)
    batters = box_score(game_state)['lineupStats']    
    for s in batters:
        batter = find(id, s)
        if batter is not None:
            return batter

    print(id + " not found!")     
    print(game_state['boxScore'])   
    print(game_state['inning'])
    return None

def get_pitcher(id: str, game_state):
    pitchers = []
    if game_state['inning'].startswith('T'):
        pitchers =  game_state['boxScore']['home']['pitchingStats']
    else:
        pitchers =  game_state['boxScore']['visitor']['pitchingStats']
    for p in pitchers:
        if p['name'] == id:
            return p
    return None

def get_current_pitcher(game_state):    
    if game_state['inning'].startswith('T'):
        return game_state['players']['1']['1']
    return game_state['players']['0']['1']

def box_score(game_state):        
    if game_state['inning'].startswith('T'):
        return game_state['boxScore']['visitor']
    else:
        return game_state['boxScore']['home']