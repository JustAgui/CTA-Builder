import { HeroFactory } from './hero-factory';

describe('HeroFactory', () => {
  it('should create an instance', () => {
    expect(new HeroFactory()).toBeTruthy();
  });
});
