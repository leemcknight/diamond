import { getLocationString } from "../fieldLocations";
import { BoxScore, PitchingLine } from "../../types";
import {
  addHittingEntry,
  addPitchingEntry,
  getHittingEntry,
} from "../boxScore";
import { getFieldPosition } from "../position";

export function parseSubstitution(
  substitutionString: string,
  boxScore: BoxScore
) {
  let parts = substitutionString.split(",");
  const id = parts[1];
  const name = parts[2].replace(/"/g, "");
  const side = parts[3];
  const battingSpot = parts[4];
  const pos = parts[5];
  const fieldPosition = getFieldPosition(pos);

  //hitting or pitching
  if (pos == "1") {
    //pitching
    addPitchingEntry(boxScore, id, name, side == "0" ? "home" : "visitor");
  }

  //are they hitting?
  if (battingSpot != "0") {
    //hitting.  0 is the pitcher being DH'd for.

    //need to check to see if they are already in the lineup.  They could
    //just be switching spots.  If they are already in the lineup, we
    //just add a new field position for them.  Otherwise, we create and
    //add a whole new hitting entry into the box score.
    const existingPlayer = getHittingEntry(boxScore, side, id);
    if (existingPlayer) {
      existingPlayer.positions.push(fieldPosition.abbreviation);
    } else {
      addHittingEntry(
        boxScore,
        id,
        name,
        pos,
        side == "0" ? "visitor" : "home",
        Number(battingSpot) - 1
      );
    }
  }

  if (Number(parts[5]) > 10) {
    return `${
      side == "0" ? "Visiting team" : "Home team"
    } brings ${name} in as a ${fieldPosition.positionName}`;
  }

  return `${side == "0" ? "Visiting team" : "Home team"} moves ${name} to ${
    fieldPosition.positionName
  }`;
}
