import { BoxScore, BoxScoreEntry } from "../types/boxScore";

export function boxScore(visitorLine: string, homeLine: string): BoxScore {
  let boxScore = {
    innings: new Array<BoxScoreEntry>(),
  } as BoxScore;

  console.log(`visitor line: ${visitorLine}`);
  console.log(`home line: ${homeLine}`);
  for (var i = 0; i < visitorLine.length; i++) {
    boxScore.innings.push({
      inning: i + 1,
      visitor: visitorLine.substring(i, i + 1),
      home: homeLine.length <= i ? "X" : homeLine.substring(i, i + 1),
    });
  }
  return boxScore;
}

export function unquote(s: string): string {
  return s.replace(/"/g, "");
}
