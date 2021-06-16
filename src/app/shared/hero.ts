export class Hero {

  constructor(
    public name: string,
    public element: string,
    public heroclass: string,
    public rarity: string,
    public atk: number,
    public hp: number,
    public def: number,
    public movespeed: number,
    public aps: number,
    public critrate: number,
    public critdmg: number,
    public effectresistance: number,
  ) { }
}
