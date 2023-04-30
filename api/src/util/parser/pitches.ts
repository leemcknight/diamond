import { Pitch } from "../../types";

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
        break;
      case "F":
        pitch.result = "Foul";
        break;
      case "H":
        pitch.result = "Hit batter";
        break;
      case "I":
        pitch.result = "Intentional ball";
        break;
      case "K":
        pitch.result = "Strike";
        break;
      case "L":
        pitch.result = "Foul bunt";
        break;
      case "M":
        pitch.result = "Missed bunt attempt";
        break;
      case "N":
        pitch.result = "no pitch (balks or interference calls)";
        break;
      case "O":
        pitch.result = "Foul tip on bunt";
        break;
      case "P":
        pitch.result = "Pitchout";
        break;
      case "Q":
        pitch.result = "Swinging on pitchout";
        break;
      case "R":
        pitch.result = "Foul ball on pitchout";
        break;
      case "S":
        pitch.result = "Swinging strike";
        break;
      case "T":
        pitch.result = "Foul tip";
        break;
      case "U":
        pitch.result = "Unknown or missed pitch";
        break;
      case "V":
        pitch.result = "Called ball because pitcher went to his mouth";
        break;
      case "X":
        pitch.result = "Ball put into play by batter";
        break;
      case "Y":
        pitch.result = "Ball put into play on pitchout";
        break;
    }

    if (!isDescriptor) {
      pitch.code = pitchChar;
      pitches.push(pitch);
    }
  }

  return pitches;
}
