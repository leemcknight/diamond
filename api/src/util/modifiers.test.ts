import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { buildModifiers } from "./modifiers";

test("ground ball to shortstop; double play.", () => {
  //ground ball to short; double play
  const modifiers = "GDP/G6";
  const modifierString = buildModifiers(modifiers);
  console.log(modifierString);
});

test("fly ball caught by the center fielder in left center field.", () => {
  const modifiers = "F78";
  const modifierString = buildModifiers(modifiers);
  expect(modifierString).toBe("Flyball to left center field");
  console.log(modifierString);
});
