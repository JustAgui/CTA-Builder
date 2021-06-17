import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentication.service';
import {CtabuilderService} from '../shared/ctabuilder.service';

interface Response {
  token: string;
}

@Component({
  selector: 'cb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cb: CtabuilderService,
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(res => {
        this.authService.setSessionStorage((res as Response).token);
        // alertify.success("Erfolgreich eingeloggt");
        // this.ms.sendMessage("inituser");
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }

}
