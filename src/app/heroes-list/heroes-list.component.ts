import { Component, OnInit } from '@angular/core';
import { CtabuilderService } from '../shared/ctabuilder.service';

@Component({
  selector: 'cb-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {
  heroes: Array<any>;

  constructor(private cs: CtabuilderService) { }

  ngOnInit(): void {
    this.cs.getAllHeroes().subscribe(res => {
      this.heroes = res;
    });
  }

}
