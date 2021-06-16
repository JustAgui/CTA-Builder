import { Rune } from './rune';

export class RuneFactory {

  static empty(): Rune {
    return new Rune('', 0, 0, '', '', '', '', '');
  }

  static fromObject(rawRune: any): Rune {
    return new Rune(
      rawRune.name,
      rawRune.star,
      rawRune.level,
      rawRune.primary,
      rawRune.secondary1,
      rawRune.secondary2,
      rawRune.secondary3,
      rawRune.secondary4,
    );
  }
}
