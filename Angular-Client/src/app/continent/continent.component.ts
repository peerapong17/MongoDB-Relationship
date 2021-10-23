import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Continent } from '../models/response';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.css'],
})
export class ContinentComponent implements OnInit {
  name: string = '';
  continent: Continent = {} as Continent;
  constructor(
    private route: ActivatedRoute,
    private footballSer: FootballService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('id')!;
      this.footballSer.fetchContinentById(this.name).subscribe((res: Continent) => {
        this.continent = res;
      });
    });
  }
}
