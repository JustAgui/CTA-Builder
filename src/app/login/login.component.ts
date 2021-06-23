import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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
  @ViewChild('open') buttonOpenModal: ElementRef;
  @ViewChild('username') username: ElementRef;
  loginForm: FormGroup;
  public user: any;

  public modalmessage = 'Something went wrong';

  constructor(
    private fb: FormBuilder,
    private cs: CtabuilderService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login(): void {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.auth.login(val.username, val.password).subscribe(res => {
        /*console.log("edefe")
        console.log(res.status);
        if (res.status !== 200) {
          if (res.code === 403) {
            this.modalmessage = 'Wrong password or username';
          }
          this.buttonOpenModal.nativeElement.click();
          this.renderer2.listen('document', 'hide.bs.modal', () => {
            this.router.navigate(['../login'], {
              relativeTo: this.route
            });
          });

        }*/
        this.auth.setSessionStorage((res as Response).token);
        this.router.navigate(['../heroes'], {
          relativeTo: this.route
        });
        // alertify.success("Erfolgreich eingeloggt");
        // this.ms.sendMessage("inituser");
      });
    }
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): any {
    return this.auth.logout();
  }

  sendResetLink(): void {
    let username = this.username.nativeElement.value;
    this.cs.resetPassword(username, null).subscribe(result => {
      this.username.nativeElement.value = '';
      if (result.code === 200) {
        console.warn('Resetlink wurde versendet');
      }
    });

  }
}
