import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '.cb-hero-details-comments',
  templateUrl: './hero-details-comments.component.html',
  styleUrls: ['./hero-details-comments.component.scss']
})
export class HeroDetailsCommentsComponent implements OnInit {

  @Input() comment: any;
  constructor() { }

  ngOnInit(): void {
  }

}
