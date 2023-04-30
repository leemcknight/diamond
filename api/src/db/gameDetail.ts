import { TDynamoKey, getSingletonByKey } from "./dynamoReader";
import { Game, GameRecord } from "../types/game";
import { parseGameRecord } from "../util/parser/gameRecord";

export async function getGame(id: string): Promise<Game> {
  const itemKey = `game`;
  const key = {
    partitionKey: itemKey,
    sortKey: id,
  } as TDynamoKey;

  const rawGame = await getSingletonByKey<GameRecord>(key, true, true);
  const game = parseGameRecord(rawGame);
  return game;
}
