import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CtabuilderService} from '../shared/ctabuilder.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'cb-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('open') buttonOpenModal: ElementRef;
  @ViewChild('modal') modal: ElementRef;
  private user: object;
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cb: CtabuilderService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  register(): void {
    const val = this.registerForm.value;
    if (val.username && val.email && val.password) {
      this.user = {
        username : `${val.username}`,
        email : `${val.email}`,
        password : `${val.password}`,
        role : 'author'
      };
      this.cb.registerUser(this.user).subscribe(res => {

        if (res.code === 200) {
          this.buttonOpenModal.nativeElement.click();
          this.renderer2.listen('document', 'hide.bs.modal', () => {
            this.router.navigate(['../login'], {
              relativeTo: this.route
            });
          });
        }
      });
    }

  }

}
