import { BoxScore, Game, HittingEntry, PitchingLine } from "../types";
import { getFieldPosition } from "./position";

export function initBoxScore(): BoxScore {
  return {
    home: {
      lineupStats: [],
      pitchingStats: [],
    },
    visitor: {
      lineupStats: [],
      pitchingStats: [],
    },
  } as BoxScore;
}

/*
  Returns the pitching line for the current pitcher on whichever side is specified.
  side will be "home" or "visitor"
*/
export function getPitchingLine(
  boxScore: BoxScore,
  side: string
): PitchingLine {
  let stats: PitchingLine[];
  if (side == "home") {
    stats = boxScore.home.pitchingStats;
  } else {
    stats = boxScore.visitor.pitchingStats;
  }

  return stats[stats.length - 1];
}

export function addHittingEntry(
  boxScore: BoxScore,
  playerId: string,
  playerName: string,
  pos: string,
  team: string,
  subHittingIndex?: number
) {
  const fieldPosition = getFieldPosition(pos);
  const hittingEntry = {
    id: playerId,
    atBats: 0,
    hits: 0,
    leftOnBase: 0,
    name: playerName.replace(/"/g, ""),
    plateAppearances: 0,
    positions: [fieldPosition.abbreviation],
    rbi: 0,
    strikeOuts: 0,
    walks: 0,
  } as HittingEntry;

  if (team === "visitor") {
    if (subHittingIndex) {
      const subbingFor = boxScore.visitor.lineupStats[subHittingIndex];
      subbingFor.sub = hittingEntry;
    }
    boxScore.visitor.lineupStats.push(hittingEntry);
  } else {
    boxScore.home.lineupStats.push(hittingEntry);
  }
}

export function addPitchingEntry(
  boxScore: BoxScore,
  playerId: string,
  playerName: string,
  team: string
) {
  const pitchingEntry = {
    battersFaced: 0,
    earnedRuns: 0,
    hits: 0,
    homeruns: 0,
    id: playerId,
    inningsPitched: "",
    name: playerName.replace(/"/g, ""),
    outs: 0,
    pitches: 0,
    strikeouts: 0,
    strikes: 0,
    walks: 0,
  } as PitchingLine;

  if (team === "visitor") {
    boxScore.visitor.pitchingStats.push(pitchingEntry);
  } else {
    boxScore.home.pitchingStats.push(pitchingEntry);
  }
}

export function getHittingEntry(
  boxScore: BoxScore,
  hittingSide: string,
  playerId: string
): HittingEntry | null {
  let hittingLines: HittingEntry[];
  if (hittingSide == "0") {
    //visitor
    hittingLines = boxScore.visitor.lineupStats;
  } else {
    hittingLines = boxScore.home.lineupStats;
  }

  for (const line of hittingLines) {
    const rl = lineFromLine(playerId, line);
    if (rl) {
      return rl;
    }
  }

  return null;
}

function lineFromLine(
  playerId: string,
  entry: HittingEntry
): HittingEntry | undefined {
  let line: HittingEntry | undefined;
  if (entry.sub) {
    line = lineFromLine(playerId, entry.sub);
    if (line) {
      return line;
    }
  }
  if (playerId === entry.id) {
    return entry;
  }
}

export function currentSub(hittingEntry: HittingEntry) {
  if (hittingEntry.sub) {
    return currentSub(hittingEntry.sub);
  }
  return hittingEntry;
}
