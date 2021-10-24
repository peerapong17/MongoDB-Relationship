import {
  Continent,
  Country,
  Club,
  Player,
  DataResponse,
  Position,
} from './../models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  constructor(private http: HttpClient) {}

  BASE_URL: String = 'http://localhost:3000';

  fetchDatas(type: string): Observable<DataResponse> {
    return this.http
      .get<{ data: DataResponse }>(`${this.BASE_URL}/${type}`)
      .pipe(pluck('data'));
  }

  fetchAllContinents(): Observable<Continent[]> {
    return this.http
      .get<{ data: Continent[] }>(`${this.BASE_URL}/continents`)
      .pipe(pluck('data'));
  }

  fetchAllCountries(): Observable<Country[]> {
    return this.http
      .get<{ data: Country[] }>(`${this.BASE_URL}/countries`)
      .pipe(pluck('data'));
  }

  fetchAllClubs(): Observable<Club[]> {
    return this.http
      .get<{ data: Club[] }>(`${this.BASE_URL}/clubs`)
      .pipe(pluck('data'));
  }

  fetchAllPlayers(): Observable<Player[]> {
    return this.http
      .get<{ data: Player[] }>(`${this.BASE_URL}/countries`)
      .pipe(pluck('data'));
  }

  fetchAllPositions(): Observable<
    {
      id: string;
      name: string;
    }[]
  > {
    return this.http
      .get<{ data: { id: string; name: string }[] }>(
        `${this.BASE_URL}/positions`
      )
      .pipe(pluck('data'));
  }

  fetchContinentById(id: string): Observable<Continent> {
    return this.http
      .get<{ data: Continent }>(`${this.BASE_URL}/continents/${id}`)
      .pipe(pluck('data'));
  }
  fetchCountryById(id: string): Observable<Country> {
    return this.http
      .get<{ data: Country }>(`${this.BASE_URL}/countries/${id}`)
      .pipe(pluck('data'));
  }

  fetchClubById(id: string): Observable<Club> {
    return this.http
      .get<{ data: Club }>(`${this.BASE_URL}/clubs/${id}`)
      .pipe(pluck('data'));
  }

  fetchPlayerById(id: string): Observable<Player> {
    return this.http
      .get<{ data: Player }>(`${this.BASE_URL}/players/${id}`)
      .pipe(pluck('data'));
  }

  fetchPositionById(id: string): Observable<Position> {
    return this.http
      .get<{ data: Position }>(`${this.BASE_URL}/positions/${id}`)
      .pipe(pluck('data'));
  }

  createCountry(inputForm: {
    continent: string;
    name: string;
  }): Observable<Country> {
    return this.http
      .post<{ data: Country }>(`${this.BASE_URL}/countries/create`, inputForm)
      .pipe(pluck('data'));
  }

  createClub(inputForm: {
    continent: string;
    country: string;
    name: string;
  }): Observable<Club> {
    return this.http
      .post<{ data: Club }>(`${this.BASE_URL}/clubs/create`, inputForm)
      .pipe(pluck('data'));
  }

  createPlayer(inputForm: {
    name: string;
    club: string;
    country: string;
    positions: string[]
  }): Observable<Club> {
    return this.http
      .post<{ data: Club }>(`${this.BASE_URL}/players/create`, inputForm)
      .pipe(pluck('data'));
  }
}
