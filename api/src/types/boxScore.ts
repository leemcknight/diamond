export type HittingEntry = {
  name: string;
  plateAppearances: number;
  positions: string[];
  atBats: number;
  hits: number;
  rbi: number;
  walks: number;
  strikeOuts: number;
  leftOnBase: number;
  sub?: HittingEntry;
};

export type BattingStats = {
  singles: string[];
  doubles: string[];
  triples: string[];
  homeruns: string[];
  rbi: string[];
};

export type PitchingLine = {
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

export type BoxScore = {
  home: {
    lineupStats: Array<HittingEntry>;
    pitchingStats: Array<PitchingLine>;
  };
  visitor: {
    lineupStats: Array<HittingEntry>;
    pitchingStats: Array<PitchingLine>;
  };
};
