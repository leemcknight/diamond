
PADDING = 10


def pad_int(i):
    p = str(i).rjust(PADDING, " ")
    return p


def pad_str(s):
    return s.rjust(PADDING, " ")
