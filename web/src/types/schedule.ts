export type TTeamSchedule = {
  year: string;
  month: string;
  team: string;
};

export type TMonthSchedule = {
  year: string;
  month: string;
};

export type TSchedule = {
  gameId: string;
  gameNumber: string;
  dayNightIndicator: string;
  date: Date;
  dayOfWeek: string;
  homeTeam: string;
  homeGameNumber: string;
  homeLeague: string;
  visitingTeam: string;
  visitorGameNumber: string;
  visitorLeague: string;
};
