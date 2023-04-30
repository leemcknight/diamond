export type TLineScoreEntry = {
  inning: number;
  home?: string;
  visitor?: string;
};
export type TLineScore = {
  innings: Array<TLineScoreEntry>;
};
