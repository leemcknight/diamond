export type TBoxScoreEntry = {
  inning: number;
  home?: string;
  visitor?: string;
};
export type TBoxScore = {
  innings: Array<TBoxScoreEntry>;
};

export type TGameLog = {
  boxScore: TBoxScore;
  visitorScore: number;
  homeScore: number;
  homeHits: number;
  visitorHits: number;
  visitorErrors: number;
  homeErrors: number;
};
