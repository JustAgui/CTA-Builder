import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '.cb-heroes-list-item',
  templateUrl: './heroes-list-item.component.html',
  styleUrls: ['./heroes-list-item.component.scss']
})
export class HeroesListItemComponent implements OnInit {
  @Input() hero: any;
  constructor() { }

  ngOnInit(): void {
  }

}
