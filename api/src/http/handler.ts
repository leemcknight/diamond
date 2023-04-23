"use strict";
import { getAll } from "../db/ballpark";
import { getFranchises, filterFranchises } from "../db/franchise";
import { getMonthlyGames } from "../db/schedule";
import { getGame } from "../db/gameDetail";
import { getPeople } from "../db/person";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const BASE_HEADERS = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

function buildResponse<T>(response: T): APIGatewayProxyResult {
  return {
    ...BASE_HEADERS,
    body: JSON.stringify({
      success: true,
      results: response,
    }),
  };
}

function buildSingletonResponse<T>(response: T): APIGatewayProxyResult {
  return {
    ...BASE_HEADERS,
    body: JSON.stringify({
      success: true,
      result: response,
    }),
  };
}

function buildErrorResponse(error: any): APIGatewayProxyResult {
  console.error(error);
  return {
    ...BASE_HEADERS,
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      errror: error.message,
    }),
  };
}

export async function handleGetFranchises(): Promise<APIGatewayProxyResult> {
  try {
    const franchises = await getFranchises();
    return buildResponse(franchises);
  } catch (e) {
    return buildErrorResponse(e);
  }
}

export async function handleFilterFranchises(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const name = event!.pathParameters!.name;
  try {
    const franchises = await filterFranchises(name!);
    return buildResponse(franchises);
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function getMonthSchedule(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const { year, month } = event.pathParameters!;
    const results = await getMonthlyGames(year!, month!);
    return buildResponse(results);
  } catch (e) {
    return buildErrorResponse(e);
  }
}

export async function getBallparks(): Promise<APIGatewayProxyResult> {
  try {
    const parks = await getAll();
    return buildResponse(parks);
  } catch (e) {
    return buildErrorResponse(e);
  }
}

export async function getGameDetails(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const id = event.pathParameters!.id;
    const game = await getGame(id!);
    return buildSingletonResponse(game);
  } catch (e) {
    return buildErrorResponse(e);
  }
}

export async function batchGetPerson(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const ids = JSON.parse(event!.body!);
    const people = getPeople(ids);
    return buildResponse(people);
  } catch (e) {
    return buildErrorResponse(e);
  }
}
