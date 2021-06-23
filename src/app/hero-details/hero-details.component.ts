import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CtabuilderService} from '../shared/ctabuilder.service';
import { forkJoin } from 'rxjs';
import {Hero} from '../shared/hero';
import {AuthenticationService} from '../shared/authentication.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'cb-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  @ViewChild('commenttext') commenttext: ElementRef;

  public hero: Hero;
  public comments: Array<any>;
  public iconpaths: object;
  private user: object;
  private params: any;
  public isLoggedIn: boolean;
  constructor(private cs: CtabuilderService, private auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.isLoggedIn() ? this.isLoggedIn = true : this.isLoggedIn = false;
    this.params = this.route.snapshot.params;

    forkJoin([this.cs.getOneHero(this.params.id), this.cs.getCommentsFromPost(this.params.id)]).subscribe(res => {
      this.hero = res[0].acf;
      this.comments = res[1];
      this.makeIconPath();
    });
  }

  makeIconPath(): void {
    let iconpath = './assets/hero-cards/';
    this.iconpaths = {
      class : `${iconpath + this.hero.heroclass}.png`,
      element : `${iconpath + this.hero.element}.png`,
      rarity : `${iconpath + this.hero.rarity}.png`,
      img : `./assets/hero-img/${this.hero.name.toLowerCase()}.png`,
    };
  }

  addcomment(): void {

    if (this.commenttext.nativeElement.value) {
      const comment = {
        content : `${this.commenttext.nativeElement.value}`,
        status : 'publish'
      };
      this.cs.postNewComment(this.params.id, comment).subscribe(result => {
        this.cs.getCommentsFromPost(this.params.id).subscribe(res => {
          this.comments = res;
          this.commenttext.nativeElement.value = '';
        });
      });
    }

  }
}
