import { Component, OnInit } from '@angular/core';
import { Club, Country, DataResponse } from '../models/response';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
})
export class CreatePlayerComponent implements OnInit {
  player: string = '';
  club: string = 'Club';
  country: string = 'Country';
  clubs: Club[] = [];
  countries: Country[] = [];

  constructor(private footballService: FootballService) {}

  ngOnInit(): void {
    this.footballService.fetchAllCountries().subscribe((res) => {
      this.countries = res;
    });
    this.footballService.fetchAllClubs().subscribe((res) => {
      this.clubs = res;
    });
  }

  onClick() {
    const inputForm: { name: string; club: string; country: string } = {
      name: this.player,
      club: this.club,
      country: this.country,
    };

    this.footballService.createPlayer(inputForm).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => [console.log(err)]
    );
  }
}
