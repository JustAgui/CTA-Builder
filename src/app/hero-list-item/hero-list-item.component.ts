import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '.cb-hero-list-item',
  templateUrl: './hero-list-item.component.html',
  styleUrls: ['./hero-list-item.component.scss']
})
export class HeroListItemComponent implements OnInit {
  @Input() hero: any;
  constructor() { }

  ngOnInit(): void {
  }

}
