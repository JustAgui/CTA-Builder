import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '.cb-runes-list-item',
  templateUrl: './runes-list-item.component.html',
  styleUrls: ['./runes-list-item.component.scss']
})
export class RunesListItemComponent implements OnInit {
  @Input() rune: any;
  constructor() { }

  ngOnInit(): void {
  }

}
