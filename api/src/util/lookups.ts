import { Player } from "../types";

export function lookup(playerId: string, players: Player[]) {
  for (const player of players) {
    if (playerId == player.id) {
      return player.fullName?.replace(/"/g, "").replace("$", "");
    }
  }
  return playerId;
}
