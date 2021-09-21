export interface Continent {
  id: string;
  name: string;
  countries: Country[];
}

export interface Country {
  id: string;
  name: string;
  continent: string;
  clubs: Club[];
}

export interface Club {
  id: string;
  name: string;
  continent: string;
  country: string;
}
