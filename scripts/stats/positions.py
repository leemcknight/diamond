class Positions:

    positions = {
        '1': { 'position': 'Pitcher', 'fieldLocation': 'the mound' },
        '2': { 'position': 'Catcher', 'fieldLocation': 'home plate'},
        '3': { 'position': 'First baseman', 'fieldLocation': 'first base'},
        '4': { 'position': 'Second baseman', 'fieldLocation': 'second base'},
        '5': { 'position': 'Third baseman', 'fieldLocation': 'third base'},
        '6': { 'position': 'Shortstop', 'fieldLocation': 'shortstop'},
        '7': { 'position': 'Left fielder', 'fieldLocation': 'left field'},
        '8': { 'position': 'Center fielder', 'fieldLocation': 'center field'},
        '9': { 'position': 'Right fielder', 'fieldLocation': 'right field'}}

    def get_field_name(position):
        return position[position]['fieldLocation']

    def get_player_and_position(self, position, game_state):
        print('getting position for {}'.format(position))
        return '{} {}'.format(self.positions[position]['position'], 'player')

