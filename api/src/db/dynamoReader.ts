import * as aws from "aws-sdk";
import { BatchGetItemInput, KeyList } from "aws-sdk/clients/dynamodb";

/*
    This is a light wrapper around the dynamodb docclient interface.
*/
const SINGLETON_WARNING_MULTIPLE_RESULTS =
  "Multiple results were found when doing performing a singleton select with key:";
const SINGLETON_WARNING_NO_RESULTS =
  "No results were found when doing performing a singleton select with key:";
const dynamo = new aws.DynamoDB.DocumentClient();
export const TABLE_NAME = "diamond";

export type TDynamoKey = {
  partitionKey: string;
  sortKey?: string;
};

export async function getByKey<T>(key: TDynamoKey): Promise<T[]> {
  const baseConditionExpr = "item_key = :item_key";
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: baseConditionExpr,
    ExpressionAttributeValues: {
      ":item_key": key.partitionKey,
      ":item_name": "",
    },
  };

  if (key.sortKey) {
    params.KeyConditionExpression =
      baseConditionExpr + " AND item_name = :item_name";
    if (params.ExpressionAttributeValues) {
      params.ExpressionAttributeValues[":item_name"] = key.sortKey;
    }
  }

  try {
    const result = await dynamo.query(params).promise();
    return result.Items! as T[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSingletonByKey<T>(
  key: TDynamoKey,
  throwOnMultipleResults: boolean,
  throwOnNoResults: boolean
): Promise<T> {
  var keyJson = JSON.stringify(key);
  const result = await getByKey<T>(key);
  switch (result.length) {
    case 0:
      console.warn(`${SINGLETON_WARNING_NO_RESULTS} ${keyJson}`);
      if (throwOnNoResults) {
        throw new Error(`${SINGLETON_WARNING_NO_RESULTS} ${keyJson}`);
      }
      break;
    case 1:
      return result[0] as T;
    default:
      console.warn(`${SINGLETON_WARNING_MULTIPLE_RESULTS} ${keyJson}`);
      if (throwOnMultipleResults) {
        throw new Error(`${SINGLETON_WARNING_MULTIPLE_RESULTS} ${keyJson}`);
      }
      return result[0] as T;
  }

  throw new Error(
    `Unknown error on getSingletonByKey(): default case not handled.`
  );
}

export async function getByKeys<T>(keys: KeyList): Promise<T[]> {
  var params = {
    RequestItems: {
      TABLE_NAME: {
        Keys: keys,
      },
    },
  } as BatchGetItemInput;

  try {
    const results = await dynamo.batchGet(params).promise();
    return results.Responses?.TABLE_NAME as T[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
