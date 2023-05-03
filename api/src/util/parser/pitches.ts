import { BoxScore, Pitch } from "../../types";

export function parsePitches(pitchString: string): Pitch[] {
  const pitchArray = pitchString.split("");
  let pitches = new Array<Pitch>();
  let isDescriptor = false;
  for (const pitchChar of pitchArray) {
    let pitch = {} as Pitch;
    isDescriptor = false;
    switch (pitchChar) {
      case "+":
        pitch.descriptor = "following pickoff throw by the catcher";
        isDescriptor = true;
        break;
      case "*":
        pitch.descriptor = "the following pitch was blocked by the catcher";
        isDescriptor = true;
        break;
      case ".":
        pitch.descriptor = "play not involving the batter";
        isDescriptor = true;
        break;
      case "1":
        pitch.descriptor = "pickoff throw to first";
        isDescriptor = true;
        break;
      case "2":
        pitch.descriptor = "pickoff throw to second";
        isDescriptor = true;
        break;
      case "3":
        pitch.descriptor = "pickoff throw to third";
        isDescriptor = true;
        break;
      case ">":
        pitch.descriptor = "runner going on the pitch";
        isDescriptor = true;
        break;
      case "B":
        pitch.result = "Ball";
        break;
      case "C":
        pitch.result = "Called Strike";
        pitch.strike = true;
        break;
      case "F":
        pitch.result = "Foul";
        pitch.strike = true;
        break;
      case "H":
        pitch.result = "Hit batter";
        break;
      case "I":
        pitch.result = "Intentional ball";
        break;
      case "K":
        pitch.result = "Strike";
        pitch.strike = true;
        break;
      case "L":
        pitch.result = "Foul bunt";
        pitch.strike = true;
        break;
      case "M":
        pitch.result = "Missed bunt attempt";
        pitch.strike = true;
        break;
      case "N":
        pitch.result = "no pitch (balks or interference calls)";
        break;
      case "O":
        pitch.result = "Foul tip on bunt";
        pitch.strike = true;
        break;
      case "P":
        pitch.result = "Pitchout";
        break;
      case "Q":
        pitch.result = "Swinging on pitchout";
        pitch.strike = true;
        break;
      case "R":
        pitch.result = "Foul ball on pitchout";
        pitch.strike = true;
        break;
      case "S":
        pitch.result = "Swinging strike";
        pitch.strike = true;
        break;
      case "T":
        pitch.result = "Foul tip";
        pitch.strike = true;
        break;
      case "U":
        pitch.result = "Unknown or missed pitch";
        break;
      case "V":
        pitch.result = "Called ball because pitcher went to his mouth";
        break;
      case "X":
        pitch.result = "Ball put into play by batter";
        pitch.strike = true;
        break;
      case "Y":
        pitch.result = "Ball put into play on pitchout";
        pitch.strike = true;
        break;
    }

    if (!isDescriptor) {
      pitch.code = pitchChar;
      pitches.push(pitch);
    }
  }

  return pitches;
}
