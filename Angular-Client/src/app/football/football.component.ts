import { Continent, DataResponse } from './../models/response';
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
  datas: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private footballService: FootballService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('type')!;
      this.footballService.fetchDatas(this.name).subscribe(
        (res) => {
          this.datas = res;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  delete(type: string, id: string) {
    console.log(id)
    console.log(type)
    switch (type) {
      case 'Continents':
        this.footballService.deleteContinent(id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        break;

      case 'Countries':
        this.footballService.deleteCountry(id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        break;

      case 'Clubs':
        this.footballService.deleteClub(id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        break;

      case 'Players':
        this.footballService.deletePlayer(id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        break;

      case 'Positions':
        this.footballService.deletePosition(id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        break;

      default:
        break;
    }
  }
}
