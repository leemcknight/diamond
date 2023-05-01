class Positions:

    positions = {
        '1': {'position': 'Pitcher', 'fieldLocation': 'the mound', 'short': 'P'},
        '2': {'position': 'Catcher', 'fieldLocation': 'home plate', 'short': 'C'},
        '3': {'position': 'First baseman', 'fieldLocation': 'first base', 'short': '1B'},
        '4': {'position': 'Second baseman', 'fieldLocation': 'second base', 'short': '2B'},
        '5': {'position': 'Third baseman', 'fieldLocation': 'third base', 'short': '3B'},
        '6': {'position': 'Shortstop', 'fieldLocation': 'shortstop', 'short': 'SS'},
        '7': {'position': 'Left fielder', 'fieldLocation': 'left field', 'short': 'LF'},
        '8': {'position': 'Center fielder', 'fieldLocation': 'center field', 'short': 'CF'},
        '9': {'position': 'Right fielder', 'fieldLocation': 'right field', 'short': 'RF'},
        '10': {'position': 'Designited Hitter', 'fieldLocation': 'none', 'short': 'DH'},
        '11': {'position': 'Pinch Hitter', 'fieldLocation': 'none', 'short': 'PH'},
        '12': {'position': 'Pinch Runner', 'fieldLocation': 'none', 'short': 'PR'}}

    def get_field_name(position):
        return position[position]['fieldLocation']

    def abbrev(self, position):
        return self.positions[position]['short']

    def format_positions(self, positions):
        mapped = list(map(lambda pos: self.abbrev(pos), positions))
        s = "("
        i = 0
        while i < len(positions):
            s += mapped[i]
            if i < (len(positions) - 1):
                s += ", "
            i += 1

        s += ")"
        return s

    def get_player_and_position(self, position, game_state):
        return '{}'.format(self.positions[position]['position'])
