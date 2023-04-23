import { getLocationString, getPlayerAtPosition } from "./fieldLocations";
import { parseAdvances } from "./advances";
import { fromBases } from "../lookups/bases.json";
import { buildModifiers } from "./modifiers";

import { Event, Play, Description, Player, Pitch } from "../types/";

function parsePitches(pitchString: string): Pitch[] {
  const pitchArray = pitchString.split("");
  let pitches = new Array<Pitch>();
  let isDescriptor = false;
  for (const pitchChar of pitchArray) {
    let pitch = {} as Pitch;
    isDescriptor = false;
    switch (pitchChar) {
      case "+":
        pitch.descriptor = "following pickoff throw by the catcher";
        isDescriptor = true;
        break;
      case "*":
        pitch.descriptor = "the following pitch was blocked by the catcher";
        isDescriptor = true;
        break;
      case ".":
        pitch.descriptor = "play not involving the batter";
        isDescriptor = true;
        break;
      case "1":
        pitch.descriptor = "pickoff throw to first";
        isDescriptor = true;
        break;
      case "2":
        pitch.descriptor = "pickoff throw to second";
        isDescriptor = true;
        break;
      case "3":
        pitch.descriptor = "pickoff throw to third";
        isDescriptor = true;
        break;
      case ">":
        pitch.descriptor = "runner going on the pitch";
        isDescriptor = true;
        break;
      case "B":
        pitch.result = "Ball";
        break;
      case "C":
        pitch.result = "Called Strike";
        break;
      case "F":
        pitch.result = "Foul";
        break;
      case "H":
        pitch.result = "Hit batter";
        break;
      case "I":
        pitch.result = "Intentional ball";
        break;
      case "K":
        pitch.result = "Strike";
        break;
      case "L":
        pitch.result = "Foul bunt";
        break;
      case "M":
        pitch.result = "Missed bunt attempt";
        break;
      case "N":
        pitch.result = "no pitch (balks or interference calls)";
        break;
      case "O":
        pitch.result = "Foul tip on bunt";
        break;
      case "P":
        pitch.result = "Pitchout";
        break;
      case "Q":
        pitch.result = "Swinging on pitchout";
        break;
      case "R":
        pitch.result = "Foul ball on pitchout";
        break;
      case "S":
        pitch.result = "Swinging strike";
        break;
      case "T":
        pitch.result = "Foul tip";
        break;
      case "U":
        pitch.result = "Unknown or missed pitch";
        break;
      case "V":
        pitch.result = "Called ball because pitcher went to his mouth";
        break;
      case "X":
        pitch.result = "Ball put into play by batter";
        break;
      case "Y":
        pitch.result = "Ball put into play on pitchout";
        break;
    }

    if (!isDescriptor) {
      pitch.code = pitchChar;
      pitches.push(pitch);
    }
  }

  return pitches;
}
function buildOutDescription(code: string): Description {
  let desc = {
    long: "",
  } as Description;
  if (code.length == 1) {
    //unassisted
    switch (code) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
        desc.short = "Pop out";
        desc.long = `pops out to ${getPlayerAtPosition(code)}`;
        break;
      case "7":
      case "8":
      case "9":
        desc.short = "Flyout";
        desc.long = `flies out to ${getPlayerAtPosition(code)}`;
    }
  } else {
    //assisted
    let outs = 1;
    let runnerCode = false;
    let initialFielder = true;
    for (const pos of code) {
      if (pos == "(") {
        runnerCode = true;
      } else if (pos == ")") {
        runnerCode = false;
      } else if (runnerCode) {
        const k = pos as keyof typeof fromBases;
        desc.long += ` (the ${fromBases[k]} is out)`;
      } else {
        if (initialFielder) {
          desc.long += getPlayerAtPosition(pos);
          initialFielder = false;
        } else {
          desc.long += ` to ${getPlayerAtPosition(pos)}`;
        }
      }
    }

    desc.short = "Ground out";
  }
  if (desc.long.endsWith(" to ,")) {
    desc.long = desc.long.substr(0, desc.long.length - 5);
  }

  return desc;
}

function buildDescription(code: string): Description {
  let desc = {} as Description;
  const initial = code.substring(0, 1);
  switch (initial) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      desc = buildOutDescription(code);
      break;
    case "K":
      desc.long = "stikes out";
      desc.short = "Strikeout";
      break;
    case "W":
      desc.long = "walks";
      desc.short = "Walk";
      break;
    case "I":
      desc.long = "intentionally walked";
      desc.short = "Intentional Walk";
      break;
    case "H":
      desc.long = "homers";
      desc.short = "Homerun";
      break;
    case "S":
      desc.short = "Single";
      desc.long = `singles to ${getLocationString(code.substring(1, 2))}`;
      break;
    case "D":
      desc.short = "Double";
      desc.long = `doubles to ${getLocationString(code.substring(1, 2))}`;
      break;
    case "T":
      desc.short = "Triple";
      desc.long = `triples to ${getLocationString(code.substring(1, 2))}`;
      break;
    default:
      desc.long = desc.short = code;
      break;
  }

  return desc;
}

function parseEvent(eventString: string): Event {
  const parts = eventString.split("/");
  const descCode = parts[0];
  let event = {
    modifiers: [],
    shortDescription: "",
    advances: [],
    description: "",
  } as Event;
  for (var i = 1; i < parts.length; i++) {
    if (i == parts.length - 1) {
      const subparts = parts[i].split(".");
      if (subparts.length > 1) {
        event.advances = parseAdvances(subparts[1]);
      }
      event.modifiers.push(buildModifiers(subparts[0]));
    } else {
      event.modifiers.push(buildModifiers(parts[i]));
    }
  }
  const description = buildDescription(descCode);
  event.description = description.long;
  event.shortDescription = description.short;
  return event;
}

function lookup(playerId: string, players: Player[]) {
  for (const player of players) {
    if (playerId == player.id) {
      return player.fullName?.replace(/"/g, "").replace("$", "");
    }
  }
  return playerId;
}

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

module.exports = { parsePlay };
