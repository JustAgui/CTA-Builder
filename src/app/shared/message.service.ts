import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import jwt_decode from 'jwt-decode';

interface Token {
  data: {
    user: {
      id: string,
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  currentUserId: number;

  constructor(
    private authService: AuthenticationService,
  ) { }

  inituser(): any {
    if (this.authService.isLoggedIn()) {
      let token = sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      this.currentUserId = JSON.parse(decodedToken.data.user.id);

    }

  }
}
