import { Continent, Country, Club } from './../models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  constructor(private http: HttpClient) {}

  fetchData(type: string): Observable<Continent[]> {
    return this.http
      .get<{ data: Continent[] }>(`http://localhost:3000/${type}`)
      .pipe(pluck('data'));
  }

  fetchCountries(type: string): Observable<Country[]> {
    return this.http
      .get<{ data: Country[] }>(`http://localhost:3000/${type}`)
      .pipe(pluck('data'));
  }

  fetchContinentById(id: string): Observable<Continent> {
    return this.http
      .get<{ data: Continent }>(`http://localhost:3000/continent/${id}`)
      .pipe(pluck('data'));
  }
  fetchCountryById(id: string): Observable<Country> {
    return this.http
      .get<{ data: Country }>(`http://localhost:3000/country/${id}`)
      .pipe(pluck('data'));
  }

  fetchClubById(id: string): Observable<Club> {
    return this.http
      .get<{ data: Club }>(`http://localhost:3000/club/${id}`)
      .pipe(pluck('data'));
  }

  createCountry(continentId: string, countryName: string): Observable<Country> {
    return this.http
      .post<{ data: Country }>('http://localhost:3000/country/create', {
        continent: continentId,
        name: countryName,
      })
      .pipe(pluck('data'));
  }

  createClub(countryId: string, clubName: string): Observable<Club> {
    return this.http
      .post<{ data: Club }>('http://localhost:3000/club/create', {
        country: countryId,
        name: clubName,
      })
      .pipe(pluck('data'));
  }
}
