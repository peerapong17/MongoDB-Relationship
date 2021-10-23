import { Continent, Country } from './../models/response';
import { FootballService } from './../service/football.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.css'],
})
export class CreateClubComponent implements OnInit {
  name: string = '';
  country: string = 'Country';
  continent: string = 'Continent';
  countries: Country[] = [];
  continents: Continent[] = [];
  constructor(private footballService: FootballService) {}

  ngOnInit(): void {
    this.footballService.fetchAllCountries().subscribe((res) => {
      this.countries = res;
    });
    this.footballService.fetchAllContinents().subscribe((res) => {
      this.continents = res;
    });
  }

  onClick() {
    const inputForm: {
      continent: string;
      country: string;
      name: string;
    } = {
      name: this.name,
      continent: this.continent,
      country: this.country,
    };

    this.footballService.createClub(inputForm).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
