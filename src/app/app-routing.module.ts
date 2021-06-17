import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HeroesListComponent} from './heroes-list/heroes-list.component';
import {RunesListComponent} from './runes-list/runes-list.component';
import {HeroDetailsComponent} from './hero-details/hero-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesListComponent },
  { path: 'hero/:id', component: HeroDetailsComponent },
  { path: 'runes', component: RunesListComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
