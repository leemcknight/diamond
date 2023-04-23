import { Person, Pitch, Event } from "./";

export type Play = {
  side: string;
  playerId: string;
  player?: string;
  count: string;
  event: Event;
  substitutions: Array<string>;
  raw: string;
  comment: string;
  inning: number;
  pitches: Array<Pitch>;
};
