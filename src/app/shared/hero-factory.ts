import { Hero } from './hero';

export class HeroFactory {

  static empty(): Hero {
    return new Hero('', '', '', '', 0, 0, 0,
      0, 0, 0, 0, 0);
  }

  static fromObject(rawHero: any): Hero {
    return new Hero(
      rawHero.name,
      rawHero.element,
      rawHero.heroclass,
      rawHero.rarity,
      rawHero.atk,
      rawHero.hp,
      rawHero.def,
      rawHero.movespeed,
      rawHero.aps,
      rawHero.critrate,
      rawHero.critdmg,
      rawHero.effectresistance,
    );
  }
}
