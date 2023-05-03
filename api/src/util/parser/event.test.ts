import { HittingEntry, PitchingLine } from "../../types";
import { parseEvent } from "./event";

const HITTING_LINE = {
  name: "leonj001",
  hits: 0,
  atBats: 0,
  leftOnBase: 0,
  plateAppearances: 0,
  positions: [],
  rbi: 0,
  strikeOuts: 0,
  walks: 0,
} as HittingEntry;

const PITCHING_LINE = {
  name: "",
  inningsPitched: "0",
  earnedRuns: 0,
  walks: 0,
  strikeouts: 0,
  strikes: 0,
  battersFaced: 0,
  hits: 0,
  homeruns: 0,
  pitches: 0,
  outs: 0,
} as PitchingLine;

test("fly ball caught by the center fielder in left center field.", () => {
  const eventString = "8/F78";
  const event = parseEvent(eventString, undefined, HITTING_LINE, PITCHING_LINE);
  expect(event.shortDescription).toBe("Flyout");
  expect(event.modifiers.length).toBe(1);
});

test("no modifier; multiple advances", () => {
  const eventString = "S8.3-H;1-2";
  const event = parseEvent(eventString, undefined, HITTING_LINE, PITCHING_LINE);
  expect(event.shortDescription).toBe("Single");
  expect(event.modifiers.length).toBe(0);
  expect(event.advances.length).toBe(2);
});

test("sac fly", () => {
  const eventString = "9/SF.3-H";
  const event = parseEvent(eventString, undefined, HITTING_LINE, PITCHING_LINE);
  //flyout event
  expect(event.shortDescription).toBe("Flyout");

  //sac fly modifier
  expect(event.modifiers.length).toBe(1);

  //advance 3->H
  expect(event.advances.length).toBe(1);
});

test("event with no modifiers and advances", () => {
  //single to center
  const eventString = "S8.3-H;1-2";

  const event = parseEvent(eventString, undefined, HITTING_LINE, PITCHING_LINE);
  //flyout event
  expect(event.shortDescription).toBe("Single");

  //sac fly modifier
  expect(event.modifiers.length).toBe(0);

  //2 advances: 3->H, 1->2
  expect(event.advances.length).toBe(2);
});
