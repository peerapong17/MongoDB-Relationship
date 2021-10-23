import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/response';
import { FootballService } from '../service/football.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  Id:string = ''
  player: Player = {} as Player
  constructor(private route: ActivatedRoute,
    private footballSer: FootballService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.Id = params.get('id')!;
      this.footballSer.fetchPlayerById(this.Id).subscribe((res: Player) => {
        this.player = res;
      });
    });
  }

}
