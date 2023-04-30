import { getLocationString, getPlayerAtPosition } from "../fieldLocations";
import { parseAdvances } from "./advances";

import { buildModifiers } from "../modifiers";

import { Event, Play, Description, Player, Pitch } from "../../types";
import { lookup } from "../lookups";
import { parsePitches } from "./pitches";
import { parseEvent } from "./event";

export function parsePlay(playCsv: string, players: Player[]): Play {
  //play,inning,home/visitor,player id,count,pitches,event
  const playParts = playCsv.split(",");
  let play = {} as Play;
  play.inning = Number(playParts[1]);
  play.side = playParts[2];
  play.playerId = playParts[3];
  play.player = lookup(play.playerId, players);
  play.count = playParts[4];
  play.pitches = parsePitches(playParts[5]);
  play.event = parseEvent(playParts[6]);
  play.substitutions = [];
  play.raw = playCsv;
  return play;
}
