import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';
import {CtabuilderService} from '../shared/ctabuilder.service';

@Component({
  selector: '.cb-hero-details-comments',
  templateUrl: './hero-details-comments.component.html',
  styleUrls: ['./hero-details-comments.component.scss']
})
export class HeroDetailsCommentsComponent implements OnInit {

  @Input() comment: any;
  public currentUserId: number;
  constructor(private cs: CtabuilderService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.currentUserId = this.auth.getUserId();
  }

  deletecomment(id: number, element): void {
    this.cs.deleteComment(id).subscribe(res => {

      if (res.status === 'trash') {
        element.remove();
        console.info('Comment was deleted');
      }


    });

  }

}
