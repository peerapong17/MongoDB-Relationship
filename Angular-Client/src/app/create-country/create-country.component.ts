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
  constructor(private footballSer: FootballService) {}

  ngOnInit(): void {
    this.footballSer.fetchData('Continents').subscribe((res) => {
      this.continents = res;
    });
  }

  onClick() {
    this.footballSer.createCountry(this.continent, this.country).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
