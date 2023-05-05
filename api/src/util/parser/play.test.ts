import { Game, Player } from "../../types";
import { parsePlay } from "./play";
import { parseGameLog } from "./gameLog";
import { LakeFormation } from "aws-sdk";
const PLAYERS = [
  {
    id: "ramir001",
    fullName: "Manny Ramirez",
  },
  {
    id: "leonj001",
    fullName: "Jan Leon",
  },
] as Player[];

const GAME = {
  players: PLAYERS,
  id: "",
  gameNumber: 0,
  visitingTeam: "LAN",
  homeTeam: "CHN",
  daynightIndicator: "N",
  ballpark: "CHI11",
  gameDate: new Date(),
  usedDH: false,
  ump1B: "",
  ump2B: "",
  ump3B: "",
  umpHome: "",
  data: [],
  info: [],
  starters: [],
  plays: [],
  startTime: "",
  gameLog: {
    visitorScore: 0,
    homeScore: 0,
    visitorErrors: 0,
    visitorHits: 0,
    homeErrors: 0,
    homeHits: 0,
    lineScore: {
      innings: [],
    },
    boxScore: {
      home: {
        lineupStats: [
          {
            id: "ramir001",
            name: "Manny Ramirez",
            hits: 0,
            atBats: 0,
            leftOnBase: 0,
            plateAppearances: 0,
            positions: [],
            rbi: 0,
            strikeOuts: 0,
            walks: 0,
          },
        ],
        pitchingStats: [
          {
            id: "",
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
          },
        ],
      },
      visitor: {
        lineupStats: [
          {
            id: "leonj001",
            name: "leonj001",
            hits: 0,
            atBats: 0,
            leftOnBase: 0,
            plateAppearances: 0,
            positions: [],
            rbi: 0,
            strikeOuts: 0,
            walks: 0,
          },
          {
            id: "backw001",
            name: "Wally Backman",
            hits: 0,
            atBats: 0,
            leftOnBase: 0,
            plateAppearances: 0,
            positions: [],
            rbi: 0,
            strikeOuts: 0,
            walks: 0,
          },
        ],
        pitchingStats: [
          {
            id: "",
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
          },
        ],
      },
    },
  },
} as Game;

test("parse play", () => {
  const play2 = parsePlay("play,5,1,ramir001,00,,S8.3-H;1-2", GAME);
  console.log(play2);
  console.log(play2.player + " " + play2.event.description);

  //2 advances (3rd->Home, 1st->2nd)
  expect(play2.event.advances.length).toBe(2);

  expect(play2.event.modifiers.length).toBe(0);
});

test("double play; 2b unassisted", () => {
  //An unassisted ground ball out by the second baseman starts this double play.
  const unassisted = parsePlay("play,8,1,ramir001,22,BFCBX,4(1)3/G4/GDP", GAME);
  console.log(unassisted);

  expect(unassisted.event.modifiers.length).toBe(2);
});

test("triple play", () => {
  //The double play notation can be extended in obvious ways to describe triple plays.
  const ltp = parsePlay("play,7,1,ramir001,00,.>X,1(B)16(2)63(1)/LTP/L1", GAME);
  console.log(ltp);
});

test("fly ball to center; runner on second doubled up", () => {
  //indicates a fly ball out to the center fielder with the runner on second doubled up.
  const play4 = parsePlay("play,7,0,leonj001,01,CX,8(B)84(2)/LDP/L8", GAME);
  console.log(play4);
});

test("ground ball out at first on a ball fielded by the shortstop.", () => {
  const players = PLAYERS as Player[];
  const play3 = parsePlay("play,6,0,backw001,01,FX,63/G6M", GAME);
  console.log(play3);
});

test("fly ball caught by center fielder", () => {
  //indicates a fly ball caught by the center fielder in left center field.
  const fly = parsePlay("play,7,0,backw001,01,CX,8/F78", GAME);
  console.log(fly);
});

test("Sacrific hit to advance runner", () => {
  //With the addition of a SH modifier this form is used to indicate sacrifice hits or bunts that advance a runner.
  const sacHit = parsePlay("play,6,1,ramir001,00,X,23/SH.1-2", GAME);

  //1 modifier
  expect(sacHit.event.modifiers.length).toBe(1);

  //should show sac bunt
  expect(sacHit.event.modifiers[0]).toBe("sacrifice bunt");

  console.log(sacHit);
});

test("double play - 6-4-3", () => {
  const players = PLAYERS as Player[];
  const dp = parsePlay("play,7,0,backw001,11,FBX,64(1)3/GDP/G6", GAME);
  console.log(dp);
});
