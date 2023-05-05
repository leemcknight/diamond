const FieldPositions = {
  "3": {
    positionName: "First Base",
    abbreviation: "1B",
  },
  "1": {
    positionName: "Pitcher",
    abbreviation: "P",
  },
  "2": {
    positionName: "Catcher",
    abbreviation: "C",
  },
  "4": {
    positionName: "Second Base",
    abbreviation: "2B",
  },
  "5": {
    positionName: "Third Base",
    abbreviation: "3B",
  },
  "6": {
    positionName: "Shortstop",
    abbreviation: "SS",
  },
  "7": {
    positionName: "Left Field",
    abbreviation: "LF",
  },
  "8": {
    positionName: "Center Field",
    abbreviation: "CF",
  },
  "9": {
    positionName: "Right Field",
    abbreviation: "RF",
  },
  "0": {
    positionName: "Pitcher",
    abbreviation: "P",
  },
  "10": {
    positionName: "Designated Hitter",
    abbreviation: "DH",
  },
  "11": {
    positionName: "Designated Hitter",
    abbreviation: "DH",
  },
  "12": {
    positionName: "Designated Runner",
    abbreviation: "DR",
  },
};

export function getFieldPosition(pos: string): {
  positionName: string;
  abbreviation: string;
} {
  const loc = FieldPositions[pos];
  if (!loc) {
    throw new Error(`Field Position not found for ${pos}`);
  }

  return loc;
}
