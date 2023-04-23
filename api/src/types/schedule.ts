export type Schedule = {
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
  canceled?: string;
  makeupDate?: Date;
};
