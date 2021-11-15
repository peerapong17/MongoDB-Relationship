import { Router, ActivatedRoute } from '@angular/router';
import { Continent, Country, Club } from './../models/response';
import { FootballService } from './../service/football.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.css'],
})
export class CreateClubComponent implements OnInit {
  id: string = '';
  name: string = '';
  country: string = 'Country';
  continent: string = 'Continent';
  countries: Country[] = [];
  continents: Continent[] = [];
  constructor(
    private footballService: FootballService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.footballService.fetchClubById(this.id).subscribe((res: Club) => {
        this.name = res.name;
        this.country = res.country.name;
        this.continent = res.continent.name;
      });
    });
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

    if (this.id) {
      this.footballService.updateClub(this.id, inputForm).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/football/Clubs']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.footballService.createClub(inputForm).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/football/Clubs']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
