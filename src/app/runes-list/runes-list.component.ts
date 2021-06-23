import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CtabuilderService} from '../shared/ctabuilder.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../shared/authentication.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'cb-runes-list',
  templateUrl: './runes-list.component.html',
  styleUrls: ['./runes-list.component.scss']
})
export class RunesListComponent implements OnInit, AfterViewInit {
  runeForm: FormGroup;
  public runes: Array<any>;
  private rune: object;
  private page = 1;
  private totalPages = 0;
  public needPaginate = false;
  private userId: number;
  public loggedIn = false;
  constructor(
    private cs: CtabuilderService, private fb: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.group('runes-list');
    console.time('viewinit');
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
      this.userId = this.auth.getUserId();
      this.runeForm = this.fb.group({
        runeset: ['damage'],
        primary: ['atk'],
        star: ['1'],
        level: ['1'],
        secondary1: ['atk'],
        secondary2: ['atk'],
        secondary3: ['atk'],
        secondary4: ['atk'],
      });
      this.runes = [];
      this.loadRunes(false);
    }
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

  loadRunes(newRuneadded: boolean): void {
    console.time('fetching');
    this.cs.getRunesByUser(this.userId, this.page).subscribe(res =>  {
      if (newRuneadded) {
        this.runes.unshift(res.body[0]);
      } else {
        for (let rune of res.body) {
          this.runes.push(rune);
        }
      }
      console.timeEnd('fetching');
      console.groupEnd();
      this.totalPages = +res.headers.get('X-WP-TotalPages');
      this.paginate(this.totalPages);
    });
  }

  filterByRuneset(runeset: string): void {
    this.cs.getRuneCategoryId(runeset).pipe(
      switchMap(result =>
        result[0] ? this.cs.getRunesByCategoryAndUser(result[0].id, this.userId) : this.cs.getRunesByUser(this.userId, 1)
      )
    ).subscribe(res => {
      if (res.body) {
        this.page = 1;
        this.totalPages = +res.headers.get('X-WP-TotalPages');
        this.runes = res.body;
        this.paginate(this.totalPages);

      } else {
        this.runes = res;
        this.needPaginate = false;
      }
    });
  }

  addRune(): void {
    const val = this.runeForm.value;
    let category = '';
    this.cs.getRuneCategoryId(val.runeset).subscribe(res => {
      if (res[0]) {
       category = res[0].id;
      }
      if (val.runeset && val.primary && val.star && val.level) {
        this.rune = {
          title: `${val.runeset}`,
          status : 'publish',
          categories: `${category}`,
          fields : {
            name: `${val.runeset}`,
            star: `${val.star}`,
            level: `${val.level}`,
            primary: `${val.primary}`,
            secondary1: val.secondary1 ? `${val.secondary1}` : null ,
            secondary2: val.secondary2 ? `${val.secondary2}` : null ,
            secondary3: val.secondary3 ? `${val.secondary3}` : null ,
            secondary4: val.secondary4 ? `${val.secondary4}` : null ,
          },
        };
        this.cs.createRune(this.rune).subscribe(res => {
          this.loadRunes(true);
        });
      }
    });
  }

  loadmore(): void {
    this.loadRunes(false);
  }

  ngAfterViewInit()  {
    console.timeEnd('viewinit');
  }

}
