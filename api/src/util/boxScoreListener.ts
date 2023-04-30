// listner for game events that will update the box score.
import { toBases, fromBases } from "../lookups/bases.json";

import { CreateVolumeFromBackupResponse } from "aws-sdk/clients/fsx";
import { BoxScore, Pitch, Play, Player } from "../types";

export function handleBoxScoreEvent(box: BoxScore, play: Play): BoxScore {
  //pitches
  play.pitches.forEach((pitch) => {});

  return box;
}

type ListenerContext = {
  pitcher: string;
  batter: string;
  firstBase: string;
  secondBase: string;
  thirdBase: string;
};

class BoxScoreListener {
  boxScore: BoxScore;
  listenerContext: ListenerContext;
  constructor() {
    this.boxScore = {} as BoxScore;
  }

  handleStrike() {}

  handleBall() {}

  handleStrikeOut() {}

  handleOut() {}

  handleSubstitution(from: Player, to: Player) {}

  handleAdvance(from: string, to: string) {
    
  }
}
