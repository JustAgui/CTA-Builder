import { Component, OnInit } from '@angular/core';
import { CtabuilderService } from '../shared/ctabuilder.service';
import {Hero} from '../shared/hero';

@Component({
  selector: 'cb-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  heroes: Array<any>;
  constructor(private cs: CtabuilderService) { }

  ngOnInit(): void {
    this.cs.getAllHeroes().subscribe(res => {
      this.heroes = res;
    });
      /*
      for (let hero of res) {
        for (let hero1 of Object.entries(hero.acf)) {
          console.log(hero1);
          this.heroes.push(hero1);
        }
      }
      console.log(this.heroes);

    });*/

  }


  test(event) {
    console.log(event.target);

  }

}
