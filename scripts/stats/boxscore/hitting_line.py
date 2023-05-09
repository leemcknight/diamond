from positions import Positions


def pad_int(i):
    p = str(i).ljust(20, " ")
    return p


def pad_str(s):
    return s.ljust(20, " ")


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
        p = Positions()
        l = "{}{}{}{}{}{}{}{}{}"
        name = self._name
        if self._is_sub:
            name = "  {}".format(self._name)

        print(l.format(
            pad_str("{} {}".format(
                name, p.format_positions(self._positions))),
            pad_int(self._plate_appearances),
            pad_int(self._atBats),
            pad_int(self._runs),
            pad_int(self._hits),
            pad_int(self._rbi),
            pad_int(self._walks),
            pad_int(self._strikeouts),
            pad_int(self._lob)
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
        self._plate_appearances += 1

    def player_id(self):
        return self._name

    def single(self):
        if self._sub is not None:
            self._sub.single()
        else:
            self._plate_appearances += 1
            self._hits += 1
            self._atBats += 1
            self._singles += 1

    def double(self):
        self._plate_appearances += 1
        self._hits += 1
        self._atBats += 1
        self._doubles += 1

    def triple(self):
        self._plate_appearances += 1
        self._hits += 1
        self._atBats += 1
        self._triples += 1

    def homerun(self):
        self._plate_appearances += 1
        self._hits += 1
        self._atBats += 1
        self._homeruns += 1

    def walk(self):
        self._plate_appearances += 1
        self._walks += 1

    def rbi(self):
        self._rbi += 1

    def strikeout(self):
        if self._sub is not None:
            self._sub.strikeout()
        else:
            self._plate_appearances += 1
            self._atBats += 1
            self._strikeouts += 1

    def lob(self):
        self._lob += 1
