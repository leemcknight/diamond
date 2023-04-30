from .hitting_line  import HittingLine
from .pitching_line import PitchingLine

class TeamBox:
    def __init__(self, team) -> None:
          self._lineup_stats = []
          self._pitching_line = None
          self._team = team
          pass

    def add_player(self, id, pos, spot):
        if pos == "1":
            # pitcher
            self._pitching_line = PitchingLine(id)

        if spot != "0":
            # not being dh'd
            self._lineup_stats.append(HittingLine(id, pos, False))            

    def print(self):
        print("Batters - {}     NAME     AB     R      H       RBI     BB      SO      LOB".format(self._team))
        for ls in self._lineup_stats:
            ls.print()
        
        print("Pitchers - {}        IP    H    R       ER     BB      SO      HR".format(self._team))
        if self._pitching_line is not None:
            self._pitching_line.print()

        print("\n")
        print("Pitches-strikes:")        
        print("Groundouts-Flyouts:")
        print("Batters faced:")
    
    def get_batter_line(self, player):
        for s in self._lineup_stats:
            if s.current_sub().player_id() == player:
                return s                    
        return None
    
    def get_hitting_line(self):
        return self._lineup_stats
    
    def get_pitching_line(self):        
        return self._pitching_line

    # returns the batting line for the specified spot
    # in the batting order.
    def get_spot(self, spot):
        return self._lineup_stats[int(spot)-1]
    
    def team_code(self):
        return self._team

class BoxScore:
    def __init__(self, visitor_code, home_code) -> None:
        self._home = TeamBox(home_code)
        self._visitor = TeamBox(visitor_code)        
        pass

    def add_player(self, team, player, pos, spot):
        if team == "0":
            self._visitor.add_player(player, pos, spot)
        else:
            self._home.add_player(player, pos, spot)

    def sub_pitcher(self, team, new_pitcher):
        new_line = PitchingLine(new_pitcher)
        if team == "0":
            line = self._visitor.get_pitching_line()
            line.relieve(new_line)
        else:
            line = self._home.get_pitching_line()            
            line.relieve(new_line)
    
    def sub_player(self, team, new_player, position, spot_in_order):
        # new player may be just an existing player going to a new position
        p = self.get_hitting_line(team, new_player)
        if p is not None:
            # existing player
            p.new_position(position)
        else:
            new_line = HittingLine(new_player, position, True)
            if team == "0":
                sub_line = self._visitor.get_spot(spot_in_order)
            else:
                sub_line = self._home.get_spot(spot_in_order)
            sub_line.sub(new_line)
    
    def get_hitting_line(self, team, player):
        if team == "0":
            return self._visitor.get_batter_line(player)
        else:
            return self._home.get_batter_line(player)
    
    def get_pitching_line(self, team):
        if team == "0":
            return self._visitor.get_pitching_line()
        else:
            return self._home.get_pitching_line()

    def print(self):
        print("-----------      BOX SCORE       ----------")
        print(self._home.team_code())
        self._home.print()        
        print(self._visitor.team_code)
        self._visitor.print()