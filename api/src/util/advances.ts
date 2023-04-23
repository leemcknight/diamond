import { toBases, fromBases } from "../lookups/bases.json";

function advanceDescription(advanceString: string): string {
  const from = advanceString.substring(0, 1);
  const to = advanceString.substring(2, 3);

  const kf = from as keyof typeof fromBases;
  const kt = to as keyof typeof toBases;
  return `The ${fromBases[kf]} ${toBases[kt]}`;
}

export function parseAdvances(advanceString: string): string[] {
  return advanceString.split(";").map((advance) => advanceDescription(advance));
}
