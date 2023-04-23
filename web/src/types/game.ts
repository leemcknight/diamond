import { TGameLog } from "./gameLog";

export type TPitch = {
  code: string;
  descriptor: string;
  result: string;
};

export type TPerson = {
  id: string;
  firstName?: string;
  lastName?: string;
  debut?: Date;
  managerDebut?: Date;
  coachDebut?: Date;
  umpireDebut?: Date;
  notes?: string;
};

export type TPlayer = TPerson & {
  team: string;
  fullName?: string;
  battingOrder: number;
  fieldPosition: string;
};

export type TGame = {
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
  players: Array<TPlayer>;
  starters: Array<TPlayer>;
  plays: Array<TPlay>;
  info: string[];
  data: string[];
  gameLog: TGameLog;
};
export type Event = {
  description: string;
  shortDescription: string;
  advances: Array<string>;
  modifiers: Array<string>;
};

export type TPlay = {
  side: string;
  playerId: string;
  player?: string;
  count: string;
  event: Event;
  substitutions: Array<string>;
  raw: string;
  comment: string;
  inning: number;
  pitches: Array<TPitch>;
};
