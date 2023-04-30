import { BoxScore } from "./boxScore";
import { LineScore } from "./lineScore";

export type GameLog = {
  lineScore: LineScore;
  boxScore: BoxScore;
  visitorScore: number;
  homeScore: number;
  homeHits: number;
  visitorHits: number;
  visitorErrors: number;
  homeErrors: number;
};
