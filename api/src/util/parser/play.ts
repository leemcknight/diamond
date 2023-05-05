import { getLocationString, getPlayerAtPosition } from "../fieldLocations";
import { parseAdvances } from "./advances";

import { buildModifiers } from "../modifiers";

import { Event, Play, Description, Player, Pitch, Game } from "../../types";
import { lookup } from "../lookups";
import { parsePitches } from "./pitches";
import { parseEvent } from "./event";
import { getHittingEntry, getPitchingLine } from "../boxScore";

export function parsePlay(playCsv: string, game: Game): Play {
  const players = game.players;

  //play,inning,home/visitor,player id,count,pitches,event
  const playParts = playCsv.split(",");
  let play = {} as Play;
  play.inning = Number(playParts[1]);
  play.side = playParts[2];
  play.playerId = playParts[3];
  play.player = lookup(play.playerId, players);
  play.count = playParts[4];
  play.pitches = parsePitches(playParts[5]);

  let hittingLine = getHittingEntry(
    game.gameLog.boxScore,
    play.side,
    play.playerId
  );

  if(!hittingLine) {
    throw new Error(`Hitting Line not found for ${play.playerId}`);
    
    
  }
  //TODO: maybe change this later.
  let pitchingLine = getPitchingLine(
    game.gameLog.boxScore,
    play.side == "0" ? "home" : "visitor"
  );
  play.event = parseEvent(playParts[6], game, hittingLine, pitchingLine);
  play.substitutions = [];
  play.raw = playCsv;

  //update box score

  for (const pitch of play.pitches) {
    pitchingLine.pitches++;
    if (pitch.strike) {
      pitchingLine.strikes++;
    }
  }

  return play;
}
