import { Continent } from './../models/response';
import { FootballService } from './../service/football.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css'],
})
export class FootballComponent implements OnInit {
  name: string = '';
  datas: Continent[] = [];
  constructor(
    private route: ActivatedRoute,
    private footballSer: FootballService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('type')!;
      this.footballSer.fetchData(this.name).subscribe((res: Continent[]) => {
        this.datas = res;
      });
    });
    
  }
}
