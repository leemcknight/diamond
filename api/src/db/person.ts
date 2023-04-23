import { DynamoDB } from "aws-sdk";
import { Person } from "../types/person";
import { Key } from "aws-sdk/clients/dynamodb";
import { getByKeys } from "./dynamoReader";

export async function getPerson(id: string) {}

export async function getPeople(ids: string[]): Promise<Person[]> {
  const keys = ids.map((id) => ({ item_key: { S: id } } as Key));
  return getByKeys(keys);
}
