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
  id: String;
  name: String;
  country: Country;
  club: Club;
}
