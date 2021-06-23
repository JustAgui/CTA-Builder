import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, filter, map, mergeMap, retry} from 'rxjs/operators';
import {Hero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class CtabuilderService {
  private api = 'https://api.s1810456015.student.kwmhgb.at/wp-json';
  constructor(private http: HttpClient) { }

  getAllHeroes(page): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.api}/wp/v2/heroes?page=${page}`, { observe: 'response'})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getReallyAllHeroes(page): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.api}/wp/v2/heroes?per_page=${page}`, { observe: 'response'})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getOneHero(id: number): Observable<any> {
    return this.http.get(`${this.api}/acf/v3/heroes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getCommentsFromPost(id: number): Observable<any> {
    return this.http.get(`${this.api}/wp/v2/comments?post=${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getHeroCategoryId(element: string): Observable<any> {
    return this.http.get<any>(`${this.api}/wp/v2/categories?per_page=50`)
      .pipe(map(items => items.filter(item => item.slug === element + 'heroes')))
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getRuneCategoryId(runeset: string): Observable<any> {
    return this.http.get<any>(`${this.api}/wp/v2/categories?per_page=50`)
      .pipe(map(items => items.filter(item => item.slug === runeset)))
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getHeroesByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/wp/v2/heroes?categories=${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getRunesByCategoryAndUser(id: number, userid: number): Observable<any> {
    return this.http.get<any>(`${this.api}/wp/v2/runes?categories=${id}`)
      .pipe(map(items => items.filter(item => item.author === userid)))
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/wp/v2/users/register`, data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createRune(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/wp/v2/runes`, data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getRunesByUser(userid, page): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.api}/wp/v2/runes?page=${page}&author=${userid}`, { observe: 'response'})
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.api}/wp/v2/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  postNewComment(id: number, data): Observable<any> {
    return this.http.post(`${this.api}/wp/v2/comments?post=${id}`, data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.api}/wp/v2/comments/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  resetPassword(name: string, data): Observable<any> {
    return this.http.post(`${this.api}/wp/v2/users/lostpassword?user_login=${name}`, data)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
