import {
  BoxScore,
  Game,
  GameProperty,
  GameRecord,
  Play,
  Player,
} from "../../types";
import { addHittingEntry, addPitchingEntry } from "../boxScore";
import { unquote } from "../gamelog";
import { parseComment } from "./comment";
import { parseGameLog } from "./gameLog";
import { parsePlay } from "./play";
import { parseSubstitution } from "./substitution";

export function parseGameRecord(item: GameRecord): Game {
  const blob = item.gameData;
  const log = parseGameLog(item.log);
  var game = {
    plays: new Array<Play>(),
    players: new Array<Player>(),
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
        play = parsePlay(line, game);
        game.plays.push(play);
        break;
      case "sub":
        play.substitutions.push(parseSubstitution(line, game.gameLog.boxScore));
        break;
      case "start":
        const id = parts[1];
        const fullName = parts[2];
        const team = parts[3] == "0" ? "visitor" : "home";
        const battingOrder = Number(parts[4]);
        const fieldPosition = parts[5];
        game.players.push({
          id,
          fullName,
          team,
          battingOrder,
          fieldPosition,
        });
        addHittingEntry(log.boxScore, id, fullName, fieldPosition, team);
        if (fieldPosition == "1") {
          addPitchingEntry(log.boxScore, id, fullName, team);
        }
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
      game.ump1B = info;
      break;
    case "ump2b":
      game.ump2B = info;
      break;
    case "ump3b":
      game.ump3B = info;
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
      game.precipitation = info;
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
      game.winningPitcher = unquote(info);
      break;
    case "lp":
      game.losingPitcher = unquote(info);
      break;
    case "save":
      game.savingPitcher = unquote(info);
      break;
  }
}
