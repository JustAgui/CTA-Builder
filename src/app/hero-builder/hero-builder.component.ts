import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Hero} from '../shared/hero';
import {CtabuilderService} from '../shared/ctabuilder.service';
import {ActivatedRoute} from '@angular/router';
import {forkJoin} from 'rxjs';
import {AuthenticationService} from '../shared/authentication.service';
import primaryRuneStats from '../../assets/json/primaryrunestats.json';
import secondaryRuneStats from '../../assets/json/secondaryrunestats.json';

@Component({
  selector: 'cb-hero-builder',
  templateUrl: './hero-builder.component.html',
  styleUrls: ['./hero-builder.component.scss']
})
export class HeroBuilderComponent implements OnInit {

  @ViewChild('allrunes') divRunes: ElementRef;
  public hero: Hero;
  public runes: Array<any>;
  public selectedRunes: Array<any> = [];
  public heroes: Array<any>;
  public iconpaths: object;
  public needPaginate = false;
  public loggedIn = false;
  private userId: number;
  private posts = 10;
  public reachedMaxRunes = false;

  constructor(private cs: CtabuilderService, private auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
      this.cs.getAllHeroes(50).subscribe(res => {
        this.heroes = res.body;
        this.hero = this.heroes[0].acf;
        this.makeIconPath();
      });
    }
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

  changehero(event): void {
    let selectedHeroId = event.target.options[event.target.options.selectedIndex].value;
    for (let hero of this.heroes) {
      if (hero.id === +selectedHeroId) {
        console.log(hero.id);
        this.hero = hero.acf;
        this.makeIconPath();
      }
    }
  }

  paginate(totalPages): void {
    if (totalPages > 1) {
      this.needPaginate = true;
      this.posts += 10;
    } else {
      this.needPaginate = false;
    }
  }

  addRunesToHero(): void {
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
      this.userId = this.auth.getUserId();

      this.getAllRunes();
    }
  }

  getAllRunes(): void {
    this.cs.getRunesByUser(this.userId, this.posts).subscribe(res =>  {
      this.runes = res.body;
    });
  }

  selectRune(event): void {
    let tdclick = event.currentTarget.children[0].children[0];
    if (tdclick) {
      // console.log(event.currentTarget.children[0].children[0]);
      tdclick.checked ? tdclick.checked = false : tdclick.checked = true;
    }
  }

  saveRunes(): void {
    this.selectedRunes = [];
    console.log(this.divRunes);
    for (let rune of this.divRunes.nativeElement.children) {
      if (rune.children[0].children[0].checked) {
        let id = +rune.children[1].innerText;
        for (let rune1 of this.runes) {
          if (rune1.id === id) {
            this.selectedRunes.push(rune1);
          }
        }
      }
    }
    if (this.selectedRunes.length === 0) {
      for (let hero of this.heroes) {
        if(hero.acf.name === this.hero.name) {
          this.cs.getOneHero(hero.id).subscribe(res => this.hero = res.acf);
        }
      }
    } else {
      this.calculateRuneStats();
    }
  }

  calculateRuneStats(): void {
    let sumValues = new Map();

    for (let rune of this.selectedRunes) {
      let primaryName = rune.acf.primary;
      let basePrimaryValue = 0;
      let calcPrimaryValue = 0;
      let maxLevel = 0;
      let runeSecondaries = [];
      let baseSecondaryValues = [];
      let calcSecondaryValues = [];
      let level = rune.acf.level;
      let stars = rune.acf.star;

      maxLevel = stars * 5;
      for (let stat of primaryRuneStats)
      {
        if (rune.acf.primary.toLowerCase() === stat.Stat) {
          basePrimaryValue = +stat.BaseValue.toFixed(1);
          break;
        }
      }
      calcPrimaryValue = +(+basePrimaryValue * +stars * (1 + (+level - 1) / (+maxLevel - 1))).toFixed(1);
      let primvalue = sumValues.get(`${primaryName}`);
      sumValues.has(`${primaryName}`) ? sumValues.set(`${primaryName}`, +primvalue + +calcPrimaryValue) :
        sumValues.set(`${primaryName}`, +calcPrimaryValue);


      if (rune.acf.secondary1) {
        runeSecondaries.push(rune.acf.secondary1);
      }
      if (rune.acf.secondary2) {
        runeSecondaries.push(rune.acf.secondary2);
      }
      if (rune.acf.secondary3) {
        runeSecondaries.push(rune.acf.secondary3);
      }
      if (rune.acf.secondary4) {
        runeSecondaries.push(rune.acf.secondary4);
      }

      for (let secondary of secondaryRuneStats) {
        for (let runeSecondary of runeSecondaries) {
          if (runeSecondary.toLowerCase() === secondary.Stat) {
            baseSecondaryValues.push(secondary.BaseValue);
          }
        }
      }

      for (let value of baseSecondaryValues) {
        let stat = +(value * stars * (1 + (level - 1) / (maxLevel - 1))).toFixed(0);
        calcSecondaryValues.push(stat);
      }

      for (let i = 0; i < runeSecondaries.length; i++) {
        let secvalue = sumValues.get(`${runeSecondaries[i]}`);
        sumValues.has(`${runeSecondaries[i]}`) ? sumValues.set(`${runeSecondaries[i]}`, +secvalue + +calcSecondaryValues[i]) :
          sumValues.set(`${runeSecondaries[i]}`, +calcSecondaryValues[i]);
      }
    }
    this.calculateNewHeroStats(sumValues);
  }

  calculateNewHeroStats(sumValues): void {

    for (let key of sumValues) {
      if (key[0] === 'hp') {
        this.hero.hp = +(this.hero.hp * (key[1] + 100) / 100).toFixed(0);
      }
      if (key[0] === 'atk') {
        this.hero.atk = +(this.hero.atk * (key[1] + 100) / 100).toFixed(0);
      }
      if (key[0] === 'def') {
        this.hero.def = +(this.hero.def * (key[1] + 100) / 100).toFixed(0);
      }
      if (key[0] === 'atkspeed') {
        this.hero.aps = +(this.hero.aps * (key[1] + 100) / 100).toFixed(2);
      }
      if (key[0] === 'critdmg') {
        this.hero.critdmg = +(this.hero.critdmg * (key[1] + 100) / 100).toFixed(0);
      }
      if (key[0] === 'atkrange') {
        this.hero.atkrange = +(this.hero.atkrange * (key[1] + 100) / 100).toFixed(0);
      }
    }
  }
}
