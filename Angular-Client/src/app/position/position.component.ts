import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../models/response';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  Id:string = ''
  position: Position = {} as Position

  constructor(private route: ActivatedRoute,
    private footballSer: FootballService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.Id = params.get('id')!;
      this.footballSer.fetchPositionById(this.Id).subscribe((res: Position) => {
        this.position = res;
      });
    });
  }

}
