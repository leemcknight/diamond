import { GameLog } from "../../types";
import { initBoxScore } from "../boxScore";
import { lineScore, unquote } from "../gamelog";

export function parseGameLog(log: string): GameLog {
  const parts = log.split(",");
  return {
    lineScore: lineScore(unquote(parts[19]), unquote(parts[20])),
    boxScore: initBoxScore(),
    visitorScore: Number(parts[9]),
    homeScore: Number(parts[10]),
    visitorHits: Number(parts[22]),
    homeHits: Number(parts[50]),
    visitorErrors: Number(parts[45]),
    homeErrors: Number(parts[73]),
  } as GameLog;
}
