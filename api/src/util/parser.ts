import {
  Play,
  GameLog,
  GameRecord,
  Game,
  Player,
  GameProperty,
} from "../types";
import { getLocationString } from "./fieldLocations";
import { boxScore, unquote } from "./gamelog";
import { parsePlay } from "./parsePlay";

function parseComment(commentString: string): string {
  return commentString.split(",")[1].replace(/"/g, "").replace("$", "");
}

function parseSubstitution(substitutionString: string) {
  let parts = substitutionString.split(",");
  const name = parts[2].replace(/"/g, "");
  const side = parts[3];
  const pos = getLocationString(parts[5]);
  if (Number(parts[5]) > 10) {
    return `${
      side == "0" ? "Visiting team" : "Home team"
    } brings ${name} in as a ${pos}`;
  }
  return `${
    side == "0" ? "Visiting team" : "Home team"
  } moves ${name} to ${pos}`;
}

export function parseGameLog(log: string): GameLog {
  const parts = log.split(",");
  return {
    boxScore: boxScore(unquote(parts[19]), unquote(parts[20])),
    visitorScore: Number(parts[9]),
    homeScore: Number(parts[10]),
    visitorHits: Number(parts[22]),
    homeHits: Number(parts[50]),
    visitorErrors: Number(parts[44]),
    homeErrors: Number(parts[72]),
  } as GameLog;
}

export function parseGameRecord(item: GameRecord): Game {
  const blob = item.gameData;
  const log = parseGameLog(item.log);
  var game = {
    plays: new Array<Play>(),
    players: new Array<Player>(),
    info: new Array<GameProperty>(),
    data: new Array<string>(),
  } as Game;
  const lines = blob.split("\n");
  game.id = item.id;
  game.gameLog = log;
  let line = "";
  var play = {} as Play;
  for (line of lines) {
    const parts = line.split(",");
    const id = parts[0];
    switch (id) {
      case "id":
        break;
      case "play":
        play = parsePlay(line, game.players);
        game.plays.push(play);
        break;
      case "sub":
        play.substitutions.push(parseSubstitution(line));
        break;
      case "start":
        game.players.push({
          id: parts[1],
          fullName: parts[2],
          team: parts[3] == "0" ? "visitor" : "home",
          battingOrder: Number(parts[4]),
          fieldPosition: parts[5],
        });
        break;
      case "info":
        addInfo(game, parts[1], parts[2]);
        break;
      case "com":
        if (play.comment) {
          play.comment = play.comment + parseComment(line) + " ";
        } else {
          play.comment = parseComment(line) + " ";
        }

        break;
      case "data":
        game.data.push(line);
    }
  }
  return game;
}

function addInfo(game: Game, key: string, info: string) {
  switch (key) {
    case "visteam":
      game.visitingTeam = info;
      break;
    case "hometeam":
      game.homeTeam = info;
      break;
    case "site":
      game.ballpark = info;
      break;
    case "date":
      game.gameDate = new Date(info);
      break;
    case "number":
      game.gameNumber = Number(info);
      break;
    case "starttime":
      game.startTime = info;
      break;
    case "daynight":
      game.daynightIndicator = info;
      break;
    case "usedh":
      game.usedDH = Boolean(info);
      break;
    case "howscored":
      //TODO
      break;
    case "ump1b":
      //TODO
      break;
    case "ump2b":
      //TODO
      break;
    case "ump3b":
      //TODO
      break;
    case "pitches":
      //TODO
      break;
    case "oscorer":
      //TODO
      break;
    case "temp":
      game.temp = Number(info);
      break;
    case "winddir":
      game.wind = game.wind + " " + info;
      break;
    case "windspeed":
      game.wind = game.wind + " " + info;
      break;
    case "fieldcond":
      game.fieldConditions = info;
      break;
    case "precip":
      //TODO
      break;
    case "sky":
      game.sky = info;
      break;
    case "timeofgame":
      game.timeOfGame = Number(info);
      break;
    case "attendance":
      game.attendance = Number(info);
      break;
    case "wp":
      game.winningPitcher = info;
      break;
    case "lp":
      game.losingPitcher = info;
      break;
    case "save":
      //TODO
      break;
  }
}
