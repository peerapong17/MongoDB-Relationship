import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FootballComponent } from './football/football.component';
import { HttpClientModule } from '@angular/common/http';
import { ContinentComponent } from './continent/continent.component';
import { CountryComponent } from './country/country.component';
import { ClubComponent } from './club/club.component';
import { CreateCountryComponent } from './create-country/create-country.component';
import { CreateClubComponent } from './create-club/create-club.component';
import { FormsModule } from '@angular/forms';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { PlayerComponent } from './player/player.component';
import { PositionComponent } from './position/position.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FootballComponent,
    ContinentComponent,
    CountryComponent,
    ClubComponent,
    CreateCountryComponent,
    CreateClubComponent,
    CreatePlayerComponent,
    PlayerComponent,
    PositionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
