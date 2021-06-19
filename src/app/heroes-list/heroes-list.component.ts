import { Component, OnInit } from '@angular/core';
import { CtabuilderService } from '../shared/ctabuilder.service';
import {filter, mergeMap, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'cb-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {
  public heroes: Array<any>;
  public totalPages: number;
  private posts = 10;
  public needPaginate = false;

  constructor(private cs: CtabuilderService) { }

  ngOnInit(): void {
    this.cs.getAllHeroes(this.posts).subscribe(res => {
      console.log(res.headers);
      console.log(this.totalPages);
      this.heroes = res.body;

      this.paginate(+res.headers.get('X-WP-TotalPages'));
    });
  }

  filterByElement(element: string): void {
    this.cs.getAllCategories(element).pipe(
      switchMap(result =>
        result[0] ? this.cs.getPostsByCategory(result[0].id) : this.cs.getAllHeroes(this.posts)
      )
    ).subscribe(res => {
      this.heroes = res;

      console.log(res);
    });
  }

  paginate(totalPages): void {
    if (totalPages > 1) {
      this.needPaginate = true;
      this.posts += 10;

    } else {}

  }

}

/*



 */
