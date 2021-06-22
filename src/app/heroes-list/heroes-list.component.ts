import { Component, OnInit } from '@angular/core';
import { CtabuilderService } from '../shared/ctabuilder.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cb-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {
  public heroes: Array<any>;
  private posts = 10;
  public needPaginate = false;

  constructor(private cs: CtabuilderService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.cs.getAllHeroes(this.posts).subscribe(res => {
      console.log(res.headers);
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

    } else {
      this.needPaginate = false;
    }

  }

  loadmore(): void {
    this.loadPosts();
  }

}

/*



 */
