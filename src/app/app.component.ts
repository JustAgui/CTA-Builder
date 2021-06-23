import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './shared/authentication.service';
import {CtabuilderService} from './shared/ctabuilder.service';
import {Router} from '@angular/router';
import {MessageService} from './shared/message.service';
import jwt_decode from 'jwt-decode';

interface Token {
  data: {
    user: {
      id: string,
    }
  };
}

@Component({
  selector: 'cb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CTA-Builder';
  currentUserId: number;
  user: any;
  constructor(
    private authService: AuthenticationService,
    private cs: CtabuilderService,
    private ms: MessageService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    console.log('%c My Little CTA-Builder 🦄', 'color: pink; font-size: 18px');
    if (!this.user) {
      this.inituser();
    }
  }

  inituser(): any {
    if (this.authService.isLoggedIn()) {
      let token = sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      this.currentUserId = JSON.parse(decodedToken.data.user.id);
      this.cs.getUserById(this.currentUserId).subscribe(res => {
        this.user = res;
      });
    }
  }

  getLoginLabel() {
    return this.authService.isLoggedIn() ? "Logout" : "Login";
  }

}
