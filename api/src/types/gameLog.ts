import { BoxScore } from "./boxScore";

export type GameLog = {
  boxScore: BoxScore;
  visitorScore: number;
  homeScore: number;
  homeHits: number;
  visitorHits: number;
  visitorErrors: number;
  homeErrors: number;
};
