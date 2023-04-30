import { getLocationString } from "../fieldLocations";

export function parseSubstitution(substitutionString: string) {
  let parts = substitutionString.split(",");
  const name = parts[2].replace(/"/g, "");
  const side = parts[3];
  const pos = getLocationString(parts[5]);
  if (Number(parts[5]) > 10) {
    return `${
      side == "0" ? "Visiting team" : "Home team"
    } brings ${name} in as a ${pos}`;
  }
  return `${
    side == "0" ? "Visiting team" : "Home team"
  } moves ${name} to ${pos}`;
}
