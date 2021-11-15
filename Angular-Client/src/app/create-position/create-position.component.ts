import { Position } from './../models/response';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css'],
})
export class CreatePositionComponent implements OnInit {
  id: string = '';
  position: string = '';

  constructor(
    private footballService: FootballService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.footballService
        .fetchPositionById(this.id)
        .subscribe((res: Position) => {
          this.position = res.name;
        });
    });
  }

  onClick() {
    if (this.id) {
      this.footballService
        .updatePosition(this.id, { name: this.position })
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.footballService.createPosition({ name: this.position }).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
