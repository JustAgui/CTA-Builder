import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '.cb-hero-builder-runes-list-item',
  templateUrl: './hero-builder-runes-list-item.component.html',
  styleUrls: ['./hero-builder-runes-list-item.component.scss']
})
export class HeroBuilderRunesListItemComponent implements OnInit {
  @Input() rune: any;
  constructor() { }

  ngOnInit(): void {
  }

}
