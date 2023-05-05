import { TLineScore } from "./lineScore";

export type TBoxScore = {
  home: {
    lineupStats: Array<THittingEntry>;
    pitchingStats: Array<TPitchingLine>;
  };
  visitor: {
    lineupStats: Array<THittingEntry>;
    pitchingStats: Array<TPitchingLine>;
  };
};

export type THittingEntry = {
  id: string;
  name: string;
  plateAppearances: number;
  positions: string[];
  atBats: number;
  hits: number;
  rbi: number;
  walks: number;
  strikeOuts: number;
  leftOnBase: number;
  sub?: THittingEntry;
};

export type TBattingStats = {
  singles: string[];
  doubles: string[];
  triples: string[];
  homeruns: string[];
  rbi: string[];
};

export type TPitchingLine = {
  id: string;
  name: string;
  inningsPitched: string;
  hits: number;
  earnedRuns: number;
  walks: number;
  strikeouts: number;
  homeruns: number;
  pitches: number;
  strikes: number;
  battersFaced: number;
  outs: number;
};

export type TGameLog = {
  lineScore: TLineScore;
  boxScore: TBoxScore;
  visitorScore: number;
  homeScore: number;
  homeHits: number;
  visitorHits: number;
  visitorErrors: number;
  homeErrors: number;
};
