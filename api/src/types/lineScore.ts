export type LineScoreEntry = {
  inning: number;
  home?: string;
  visitor?: string;
};
export type LineScore = {
  innings: Array<LineScoreEntry>;
};
