import { GameRecord } from "../../types";
import { getHittingEntry } from "../boxScore";
import { parseGameRecord } from "./gameRecord";
import fs = require("fs");

export function readGameRecord(): GameRecord {
  const data = fs.readFileSync("src/util/parser/test_data/game.csv", "utf8");
  const log = fs.readFileSync("src/util/parser/test_data/game_log.csv", "utf8");

  return {
    gameData: data,
    id: "",
    log: log,
  } as GameRecord;
}

test("game metadata from game record", () => {
  const raw = readGameRecord();
  const game = parseGameRecord(raw);
  expect(game.attendance).toBe(41166);
  expect(game.ballpark).toBe("CHI11");
  expect(game.losingPitcher).toBe("romos001");
  expect(game.winningPitcher).toBe("daviw001");
});

test("box score", () => {
  const gameRecord = readGameRecord();
  const game = parseGameRecord(gameRecord);

  const boxScore = game.gameLog.boxScore;

  //check box score numbers against those on baseball-reference.com for this game
  //Schwarber had 4 plate appearances, 1 at-bat, 3 walks, 1 run.
  const schwarber = getHittingEntry(boxScore, "home", "schwk001");
  expect(schwarber).not.toBe(null);
  if (schwarber) {
    expect(schwarber.plateAppearances).toBe(4);
    expect(schwarber.atBats).toBe(1);
    expect(schwarber.walks).toBe(3);
  }

  const js = JSON.stringify(boxScore);
  console.log(js);
});
