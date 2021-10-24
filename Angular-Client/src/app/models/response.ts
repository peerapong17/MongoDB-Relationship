export type DataResponse = Continent[] | Country[] | Club[] | Player[];

export interface Continent {
  id: string;
  name: string;
  countries: Country[];
  clubs: Club[];
}

export interface Country {
  id: string;
  name: string;
  continent: Continent;
  clubs: Club[];
  players: Player[];
}

export interface Club {
  id: string;
  name: string;
  continent: Continent;
  country: Country;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  country: Country;
  club: Club;
  positions: Position[]
  isChecked: boolean
}

export interface Position {
  id: string;
  name: string;
  players: Player[]
}
