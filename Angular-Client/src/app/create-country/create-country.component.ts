import { Continent } from './../models/response';
import { FootballService } from './../service/football.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css'],
})
export class CreateCountryComponent implements OnInit {
  continents: Continent[] = [];
  country: string = '';
  continent: string = 'Continent';
  constructor(private footballService: FootballService) {}

  ngOnInit(): void {
    this.footballService.fetchAllContinents().subscribe((res) => {
      this.continents = res;
    });
  }

  onClick() {
    const inputForm: {
      continent: string;
      name: string;
    } = {
      name: this.country,
      continent: this.continent,
    };

    this.footballService.createCountry(inputForm).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
