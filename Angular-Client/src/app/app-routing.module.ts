import { CreateClubComponent } from './create-club/create-club.component';
import { CreateCountryComponent } from './create-country/create-country.component';
import { ClubComponent } from './club/club.component';
import { CountryComponent } from './country/country.component';
import { ContinentComponent } from './continent/continent.component';
import { FootballComponent } from './football/football.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "football/:type",
    component: FootballComponent,
  },
  {
    path: "Continents/:id",
    component: ContinentComponent,
  },
  {
    path: "Countries/:id",
    component: CountryComponent,
  },
  {
    path: "Clubs/:id",
    component: ClubComponent,
  },
  {
    path: "CreateCountry",
    component: CreateCountryComponent,
  },
  {
    path: "CreateClub",
    component: CreateClubComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
