/*
plays: [],
        players: [],
        info: {},
        starters: [],
        data: [],
        log: log
*/

import { GameLog, Play, Player } from "./";

export type Game = {
  id: string;
  gameNumber: number;
  visitingTeam: string;
  homeTeam: string;
  ballpark: string;
  daynightIndicator: string;
  startTime: string;
  gameDate: Date;
  usedDH: boolean;
  temp?: number;
  wind?: string;
  fieldConditions?: string;
  sky?: string;
  timeOfGame?: number;
  attendance?: number;
  winningPitcher?: string;
  losingPitcher?: string;
  players: Array<Player>;
  starters: Array<Player>;
  plays: Array<Play>;
  info: Array<GameProperty>;
  data: string[];
  gameLog: GameLog;
};

export type GameProperty = {
  property: string;
  propertyValue: string;
};

export type GameRecord = {
  id: string;
  gameData: string;
  log: string;
};
