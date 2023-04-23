export type BoxScoreEntry = {
  inning: number;
  home?: string;
  visitor?: string;
};
export type BoxScore = {
  innings: Array<BoxScoreEntry>;
};
