import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models/response';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  name: string = '';
  datas: Country = {} as Country;
  constructor(
    private route: ActivatedRoute,
    private footballSer: FootballService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('id')!;
      this.footballSer.fetchCountryById(this.name).subscribe((res: Country) => {
        this.datas = res;
      });
    });
  }
}
