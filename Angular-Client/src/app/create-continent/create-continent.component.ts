import { ActivatedRoute, Router } from '@angular/router';
import { FootballService } from './../service/football.service';
import { Component, OnInit } from '@angular/core';
import { Continent } from '../models/response';

@Component({
  selector: 'app-create-continent',
  templateUrl: './create-continent.component.html',
  styleUrls: ['./create-continent.component.css'],
})
export class CreateContinentComponent implements OnInit {
  continent: string = '';
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private footballService: FootballService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.footballService
        .fetchContinentById(this.id)
        .subscribe((res: Continent) => {
          this.continent = res.name;
        });
    });
  }

  onClick() {
    if (this.id) {
      this.footballService
        .updateContinent(this.id, { name: this.continent })
        .subscribe(
          (res) => {
            this.continent = '';
            this.router.navigate(['/football/Continents'])
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.footballService.createContinent({ name: this.continent }).subscribe(
        (res) => {
          this.continent = '';
          this.router.navigate(['/football/Continents'])
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
