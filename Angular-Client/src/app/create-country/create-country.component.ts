import { Continent, Country } from './../models/response';
import { FootballService } from './../service/football.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css'],
})
export class CreateCountryComponent implements OnInit {
  continents: Continent[] = [];
  id: string = '';
  country: string = '';
  continent: string = 'Continent';
  constructor(
    private route: ActivatedRoute,
    private footballService: FootballService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.footballService.fetchAllContinents().subscribe((res) => {
      this.continents = res;
    });
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.footballService
        .fetchCountryById(this.id)
        .subscribe((res: Country) => {
          this.continent = res.continent.name;
          this.country = res.name;
        });
    });
  }

  onClick() {
    console.log('d')
    const inputForm: {
      continent: string;
      name: string;
    } = {
      name: this.country,
      continent: this.continent,
    };

    if (this.id) {
      this.footballService.updateCountry(this.id, inputForm).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/football/Countries'])
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.footballService.createCountry(inputForm).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/football/Countries'])
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
