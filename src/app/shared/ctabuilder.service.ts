import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Hero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class CtabuilderService {
  private api = 'https://api.s1810456015.student.kwmhgb.at/wp-json';
  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Array<any>> {
    return this.http.get(`${this.api}/acf/v3/heroes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
