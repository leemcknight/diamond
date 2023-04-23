export type Person = {
  id: string;
  firstName?: string;
  lastName?: string;
  debut?: Date;
  managerDebut?: Date;
  coachDebut?: Date;
  umpireDebut?: Date;
  notes?: string;
};

export type Player = Person & {
  team: string;
  fullName?: string;
  battingOrder: number;
  fieldPosition: string;
};
