import { Country, Club } from './../models/response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  name: string = '';
  club: Club = {} as Club;
  constructor(
    private route: ActivatedRoute,
    private footballSer: FootballService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('id')!;
      this.footballSer.fetchClubById(this.name).subscribe((res: Club) => {
        this.club = res;
      });
    });
  }
}
