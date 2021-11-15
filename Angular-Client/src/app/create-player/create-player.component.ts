import { ActivatedRoute, Router } from '@angular/router';
import { Position, Player } from './../models/response';
import { Component, OnInit } from '@angular/core';
import { Club, Country, DataResponse } from '../models/response';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
})
export class CreatePlayerComponent implements OnInit {
  id: string = '';
  player: string = '';
  club: string = 'Club';
  country: string = 'Country';
  clubs: Club[] = [];
  countries: Country[] = [];
  positions: { id: string; name: string; isChecked: boolean }[] = [];

  constructor(
    private footballService: FootballService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.footballService.fetchPlayerById(this.id).subscribe((res: Player) => {
        this.player = res.name;
        this.club = res.club.name;
        this.country = res.country.name;
      });
    });
    this.footballService.fetchAllCountries().subscribe((res) => {
      this.countries = res;
    });
    this.footballService.fetchAllClubs().subscribe((res) => {
      this.clubs = res;
    });
    this.footballService.fetchAllPositions().subscribe((res) => {
      console.log(res);
      this.positions = res.map((position) => {
        return { ...position, isChecked: false };
      });
    });
  }

  fetchSelectedItems(): string[] {
    const selectedItemsList: string[] = [];
    this.positions.filter((value, index) => {
      if (value.isChecked == true) {
        selectedItemsList.push(value.id);
      }
    });

    return selectedItemsList;
  }

  onClick() {
    const inputForm: {
      name: string;
      club: string;
      country: string;
      positions: string[];
    } = {
      name: this.player,
      club: this.club,
      country: this.country,
      positions: this.fetchSelectedItems(),
    };

    if (this.id) {
      this.footballService.updatePlayer(this.id, inputForm).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.footballService.createPlayer(inputForm).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }

    // this.player = '';
    // this.club = 'Club';
    // this.country = 'Country';
    // this.positions = this.positions.map((position) => {
    //   return { ...position, isChecked: false };
    // });
  }
}
