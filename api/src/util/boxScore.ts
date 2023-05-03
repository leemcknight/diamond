import { Game, HittingEntry, PitchingLine } from "../types";
import { lineScore } from "./gamelog";

/*
  Returns the pitching line for the current pitcher on whichever side is specified.
  side will be "home" or "visitor"
*/
export function getPitchingLine(game: Game, side: string): PitchingLine {
  let stats: PitchingLine[];
  if (side == "home") {
    stats = game.gameLog.boxScore.home.pitchingStats;
  } else {
    stats = game.gameLog.boxScore.visitor.pitchingStats;
  }

  return stats[stats.length - 1];
}

export function getHittingEntry(
  game: Game,
  hittingSide: string,
  playerId: string
): HittingEntry {
  let hittingLines: HittingEntry[];
  if (hittingSide == "0") {
    //visitor
    hittingLines = game.gameLog.boxScore.visitor.lineupStats;
  } else {
    hittingLines = game.gameLog.boxScore.home.lineupStats;
  }

  for (const line of hittingLines) {
    const rl = lineFromLine(playerId, line);
    if (rl) {
      return rl;
    }
  }

  console.log(`Hitting Entry not found for: ${playerId}`);
  throw Error("Hitting Line not found for " + playerId);
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
  if (playerId === entry.name) {
    return entry;
  }
}
