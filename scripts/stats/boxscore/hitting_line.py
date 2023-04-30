class HittingLine:
    def __init__(self, player, position, is_sub) -> None:
        self._name = player
        self._positions = [position]
        self._plate_appearances = 0
        self._atBats = 0
        self._runs = 0
        self._hits = 0
        self._rbi = 0
        self._walks = 0
        self._strikeouts = 0
        self._lob = 0        
        self._singles = 0        
        self._doubles = 0
        self._triples = 0
        self._homeruns = 0
        self._sub = None
        self._is_sub = is_sub
        pass


    def print(self):
        l = "{}     {}       {}      {}      {}      {}      {}      {}"
        if self._is_sub:
            l = "   " + l
        print(l.format(
            "{} ({})".format(self._name, self._positions),            
            self._atBats,
            self._runs,
            self._hits,
            self._rbi,
            self._walks,
            self._strikeouts,
            self._lob
        ))    
        if self._sub is not None:
            self._sub.print()

    # gets the hitting line for the sub in this spot.
    def current_sub(self):
        if self._sub is not None:
            return self._sub.current_sub()
        return self
    
    def sub(self, sub_line):
        if self._sub is None:
            print("setting sub to {}".format(sub_line.player_id()))
            self._sub = sub_line
        else:
            self._sub.sub(sub_line)

    def new_position(self, pos):
        self._positions.append(pos)

    def plate_appearance(self):
        self._plate_appearances +=1 

    def player_id(self):
        return self._name    

    def single(self):        
        self._plate_appearances  += 1
        self._hits += 1      
        self._atBats += 1  
        self._singles += 1

    def double(self):    
        self._plate_appearances  += 1
        self._hits += 1
        self._atBats += 1
        self._doubles += 1 

    def triple(self):
        self._plate_appearances  += 1
        self._hits += 1
        self._atBats += 1
        self._triples += 1

    def homerun(self):
        self._plate_appearances  += 1
        self._hits += 1
        self._atBats += 1
        self._homeruns += 1
    
    def walk(self):
        self._plate_appearances  += 1
        self._walks += 1
    
    def rbi(self):
        self._rbi += 1

    def strikeout(self):
        self._plate_appearances  += 1
        self._atBats  += 1
        self._strikeouts += 1

    def lob(self):
        self._lob += 1