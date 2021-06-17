import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';

interface Token {
  exp: number;
  user: {
    id: string,
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api = 'https://api.s1810456015.student.kwmhgb.at/wp-json/jwt-auth/v1';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {
    return this.http.post(`${this.api}/token`,  {
      username : username,
      password : password
    });
  }

  public setSessionStorage(token: string): any {
    sessionStorage.setItem('token', token);
  }

  logout(): any {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    if (sessionStorage.getItem('token')) {
      let token: string = sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
