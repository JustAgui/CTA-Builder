import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CtabuilderService} from '../shared/ctabuilder.service';
import { forkJoin } from 'rxjs';
import {Hero} from '../shared/hero';

@Component({
  selector: 'cb-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  public hero: Hero;
  public comments: Array<any>;
  public iconpaths: object;
  constructor(private cs: CtabuilderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    console.log(params.id);
    forkJoin([this.cs.getOneHero(params.id), this.cs.getCommentsFromPost(params.id)]).subscribe(res => {
      this.hero = res[0].acf;
      this.comments = res[1];
      console.log(this.hero);
      console.log(this.comments);
      this.makeIconPath();
    });
  }

  makeIconPath(): void {
    let iconpath = './assets/hero-cards/';
    this.iconpaths = {
      class : `${iconpath + this.hero.heroclass}.png`,
      element : `${iconpath + this.hero.element}.png`,
      rarity : `${iconpath + this.hero.rarity}.png`,
      img : `./assets/hero-img/${this.hero.name.toLowerCase()}.png`,
    };

  }

}
