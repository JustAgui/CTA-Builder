import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '.cb-hero-builder-added-runes',
  templateUrl: './hero-builder-added-runes.component.html',
  styleUrls: ['./hero-builder-added-runes.component.scss']
})
export class HeroBuilderAddedRunesComponent implements OnInit {
  @Input() rune: any;
  constructor() { }

  ngOnInit(): void {
  }

}
