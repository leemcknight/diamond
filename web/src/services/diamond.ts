import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TBallpark,
  TFranchise,
  TGame,
  TMonthSchedule,
  TSchedule,
} from "../types";
import config from "../config/config.json";

type TSingletonApiResponse<T> = {
  success: boolean;
  result: T;
};

type TListApiResponse<T> = {
  success: boolean;
  results: Array<T>;
};

function singletonTransform<T>(rawResult: TSingletonApiResponse<T>): T {
  return rawResult.result;
}

function arrayTransform<T>(rawResult: TListApiResponse<T>): T[] {
  return rawResult.results;
}

// Define a service using a base URL and expected endpoints
export const diamondApi = createApi({
  reducerPath: "diamondApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  endpoints: (builder) => ({
    getFranchises: builder.query<Array<TFranchise>, void>({
      query: () => `franchises/`,
      transformResponse: (response: TListApiResponse<TFranchise>) =>
        arrayTransform<TFranchise>(response),
    }),
    getBallparks: builder.query<Array<TBallpark>, void>({
      query: () => `ballparks/`,
      transformResponse: (response: TListApiResponse<TBallpark>) =>
        arrayTransform<TBallpark>(response),
    }),
    getSchedule: builder.query<Array<TSchedule>, TMonthSchedule>({
      query: (s: TMonthSchedule) => `schedule/${s.year}/${s.month}`,
      transformResponse: (response: TListApiResponse<TSchedule>) =>
        arrayTransform<TSchedule>(response),
    }),
    getGame: builder.query<TGame, string>({
      query: (gameId: string) => `game/${gameId}/playByPlay`,
      transformResponse: (response: TSingletonApiResponse<TGame>) =>
        singletonTransform<TGame>(response),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetFranchisesQuery,
  useGetBallparksQuery,
  useGetScheduleQuery,
  useGetGameQuery,
} = diamondApi;
