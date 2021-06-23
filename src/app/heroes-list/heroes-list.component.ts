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
  private page = 1;
  private totalPages = 0;
  public needPaginate = false;

  constructor(private cs: CtabuilderService) { }

  ngOnInit(): void {
    this.heroes = [];
    this.loadPosts();
  }

  loadPosts(): void {
    this.cs.getAllHeroes(this.page).subscribe(res => {
      for (let hero of res.body) {
        this.heroes.push(hero);
      }
      this.totalPages = +res.headers.get('X-WP-TotalPages');
      this.paginate(this.totalPages);
    });
  }

  filterByElement(element: string): void {
    this.cs.getAllCategories(element).pipe(
      switchMap(result =>
        result[0] ? this.cs.getPostsByCategory(result[0].id) : this.cs.getAllHeroes(1)
      )
    ).subscribe(res => {
      if (res.body) {
        this.page = 1;
        this.totalPages = +res.headers.get('X-WP-TotalPages');
        console.log(this.totalPages);
        this.heroes = res.body;
        this.paginate(this.totalPages);

      } else {
        this.heroes = res;
        this.needPaginate = false;
      }
    });
  }

  paginate(totalPages): void {

    if (this.page < this.totalPages) {
      if (totalPages > 1) {
        this.needPaginate = true;
        this.page++;
      } else {
        this.needPaginate = false;
      }
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
