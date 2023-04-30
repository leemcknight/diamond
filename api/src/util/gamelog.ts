import { LineScore, LineScoreEntry } from "../types/lineScore";

export function lineScore(visitorLine: string, homeLine: string): LineScore {
  let lineScore = {
    innings: new Array<LineScoreEntry>(),
  } as LineScore;

  console.log(`visitor line: ${visitorLine}`);
  console.log(`home line: ${homeLine}`);
  for (var i = 0; i < visitorLine.length; i++) {
    lineScore.innings.push({
      inning: i + 1,
      visitor: visitorLine.substring(i, i + 1),
      home: homeLine.length <= i ? "X" : homeLine.substring(i, i + 1),
    });
  }
  return lineScore;
}

export function unquote(s: string): string {
  return s.replace(/"/g, "");
}
