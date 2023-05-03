import { parseAdvances } from "./advances";

test("Second to third, first to second", () => {
  const advanceString = "2-3;1-2";

  const advances = parseAdvances(advanceString);
  expect(advances.length).toBe(2);
});
