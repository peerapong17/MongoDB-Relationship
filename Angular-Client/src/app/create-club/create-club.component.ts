import { Country } from './../models/response';
import { FootballService } from './../service/football.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.css']
})
export class CreateClubComponent implements OnInit {
  name:string = ''
  country:string = "Country"
  countries: Country[] = [];
  constructor(private footballSer:FootballService) { }

  ngOnInit(): void {
    this.footballSer.fetchCountries('Countries').subscribe((res) => {
      this.countries = res;
    });
  }

  onClick(){
    this.footballSer.createClub(this.country, this.name).subscribe(res=>{
      console.log(res)
    }, (err)=>{
      console.log(err)
    })
  }
}
