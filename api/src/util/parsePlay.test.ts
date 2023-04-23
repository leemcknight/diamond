import { Player } from "../types";
import { parsePlay } from "./parsePlay";
import { parseGameLog } from "./parser";
const PLAYERS = [
  {
    id: "ramir001",
    fullName: "Manny Ramirez",
  },
  {
    id: "leonj001",
    fullName: "Jan Leon",
  },
];

test("parse play", () => {
  const players = PLAYERS as Player[];
  const play2 = parsePlay(
    "play,5,1,ramir001,00,,S8.3-H;1-2",
    players as Player[]
  );
  console.log(JSON.stringify(play2));

  //indicates a fly ball out to the center fielder with the runner on second doubled up.
  const play4 = parsePlay(
    "play,7,0,leonj001,01,CX,8(B)84(2)/LDP/L8",
    players as Player[]
  );
  console.log(JSON.stringify(play4));

  //With the addition of a SH modifier this form is used to indicate sacrifice hits or bunts that advance a runner.
  const sacHit = parsePlay("play,6,1,camik001,00,X,23/SH.1-2", players);
  console.log(JSON.stringify(sacHit));

  //An unassisted ground ball out by the second baseman starts this double play.
  const unassisted = parsePlay(
    "play,8,1,smito001,22,BFCBX,4(1)3/G4/GDP",
    players
  );
  console.log(JSON.stringify(unassisted));

  //The double play notation can be extended in obvious ways to describe triple plays.
  const ltp = parsePlay(
    "play,7,1,randw001,00,.>X,1(B)16(2)63(1)/LTP/L1",
    players
  );
  console.log(JSON.stringify(ltp));

  //indicates a fly ball caught by the center fielder in left center field.
  const fly = parsePlay("play,7,0,saboc001,01,CX,8/F78", players);
  console.log(JSON.stringify(fly));
});

test("ground ball out at first on a ball fielded by the shortstop.", () => {
  const players = PLAYERS as Player[];
  const play3 = parsePlay("play,6,0,davie001,01,FX,63/G6M", players);
  console.log(JSON.stringify(play3));
});

test("double play - 6-4-3", () => {
  const players = PLAYERS as Player[];
  const dp = parsePlay("play,7,0,backw001,11,FBX,64(1)3/GDP/G6", players);
  console.log(JSON.stringify(dp));
});
