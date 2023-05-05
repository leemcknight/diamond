import {
  Event,
  Description,
  Game,
  HittingEntry,
  PitchingLine,
  Play,
} from "../../types";
import { getLocationString, getPlayerAtPosition } from "../fieldLocations";
import { buildModifiers } from "../modifiers";
import { parseAdvances } from "./advances";
import { fromBases } from "../../lookups/bases.json";

export function parseEvent(
  eventString: string,
  game: Game | undefined,
  hittingLine: HittingEntry,
  pitchingLine: PitchingLine
): Event {
  const parts = eventString.split("/");
  const descCode = parts[0];
  let event = {
    modifiers: [],
    shortDescription: "",
    advances: [],
    description: "",
  } as Event;

  //modifiers
  for (var i = 1; i < parts.length; i++) {
    const line = parts[i].split(".")[0];
    event.modifiers.push(buildModifiers(line));
  }

  const lastPart = parts[parts.length - 1];
  const advanceStrings = lastPart.split(".");
  if (advanceStrings.length > 1) {
    event.advances = parseAdvances(advanceStrings[1]);
  }

  const description = buildDescription(descCode, hittingLine, pitchingLine);
  event.description = description.long;
  event.shortDescription = description.short;
  return event;
}

function buildDescription(
  code: string,
  hittingLine: HittingEntry,
  pitchingLine: PitchingLine
): Description {
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
      pitchingLine.outs++;
      pitchingLine.battersFaced++;
      hittingLine.atBats++;
      hittingLine.plateAppearances++;
      break;
    case "K":
      desc.long = "stikes out";
      desc.short = "Strikeout";
      pitchingLine.outs++;
      pitchingLine.strikeouts++;
      pitchingLine.battersFaced++;
      hittingLine.atBats++;
      hittingLine.strikeOuts++;
      hittingLine.plateAppearances++;
      break;
    case "W":
      desc.long = "walks";
      desc.short = "Walk";
      pitchingLine.battersFaced++;
      pitchingLine.walks++;
      hittingLine.walks++;
      hittingLine.plateAppearances++;
      break;
    case "I":
      desc.long = "intentionally walked";
      desc.short = "Intentional Walk";
      pitchingLine.battersFaced++;
      pitchingLine.walks++;
      hittingLine.plateAppearances++;
      hittingLine.walks++;
      break;
    case "H":
      desc.long = "homers";
      desc.short = "Homerun";
      pitchingLine.battersFaced++;
      pitchingLine.homeruns++;
      pitchingLine.hits++;
      hittingLine.hits++;
      hittingLine.atBats++;
      hittingLine.plateAppearances++;
      break;
    case "S":
      desc.short = "Single";
      desc.long = `singles to ${getLocationString(code.substring(1, 2))}`;
      pitchingLine.battersFaced++;
      pitchingLine.hits++;
      hittingLine.hits++;
      hittingLine.atBats++;
      hittingLine.plateAppearances++;
      break;
    case "D":
      desc.short = "Double";
      desc.long = `doubles to ${getLocationString(code.substring(1, 2))}`;
      pitchingLine.battersFaced++;
      pitchingLine.hits++;
      hittingLine.hits++;
      hittingLine.atBats++;
      hittingLine.plateAppearances++;
      break;
    case "T":
      desc.short = "Triple";
      desc.long = `triples to ${getLocationString(code.substring(1, 2))}`;
      pitchingLine.battersFaced++;
      pitchingLine.hits++;
      hittingLine.hits++;
      hittingLine.atBats++;
      hittingLine.plateAppearances++;
      break;
    default:
      desc.long = desc.short = code;
      break;
  }

  return desc;
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
