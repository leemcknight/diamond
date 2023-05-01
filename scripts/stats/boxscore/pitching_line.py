import math


class PitchingLine:
    def __init__(self, pitcher) -> None:
        self._name = pitcher
        self._recorded_outs = 0
        self._hits = 0
        self._runs = 0
        self._earned_runs = 0
        self._walks = 0
        self._strikeouts = 0
        self._homeruns = 0
        self._pitches = 0
        self._strikes = 0
        self._batters_faced = 0
        self._reliever = None
        pass

    def relieve(self, reliever):
        if self._reliever is None:
            self._reliever = reliever
        else:
            self._reliever.relieve(reliever)

    def current_reliever(self):
        if self._reliever is None:
            return self
        return self._reliever.current_reliever()

    def pitch(self, is_strike):
        if self._reliever is not None:
            self._reliever.pitch(is_strike)
        else:
            self._pitches += 1
            if (is_strike):
                self._strikes += 1

    def strikeout(self, is_looking):
        if self._reliever is not None:
            self._reliever.strikeout(is_looking)
        else:
            self._strikeouts += 1

    def hit(self):
        if self._reliever is not None:
            self._reliever.hit()
        else:
            self._hits += 1

    def homerun(self):
        if self._reliever is not None:
            self._reliever.homerun()
        else:
            self._hits += 1
            self._homeruns += 1

    def walk(self):
        if self._reliever is not None:
            self._reliever.walk()
        else:
            self._walks += 1

    def record_out(self):
        if self._reliever is not None:
            self._reliever.record_out()
        else:
            self._recorded_outs += 1

    def _innings(self):
        # full innings
        fi = math.floor(self._recorded_outs / 3)

        # partial innings
        pi = self._recorded_outs % 3

        if pi == 0:
            return str(int(fi))
        if fi == 0:
            return "{}/3".format(pi)

        return "{} {}/3".format(fi, pi)

    def print(self):
        l = "{}       {}      {}      {}      {}      {}      {}      {}"
        print(l.format(
            self._name,
            self._innings(),
            self._hits,
            self._runs,
            self._earned_runs,
            self._walks,
            self._strikeouts,
            self._homeruns
        ))
        if self._reliever is not None:
            self._reliever.print()

    def print_pitches(self):
        print("{} {}-{}".format(self._name, self._pitches, self._strikes), end="")
        if self._reliever is not None:
            print("; ", end="")
            self._reliever.print_pitches()
