import { Component, OnInit } from '@angular/core';
import {CtabuilderService} from '../shared/ctabuilder.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'cb-runes-list',
  templateUrl: './runes-list.component.html',
  styleUrls: ['./runes-list.component.scss']
})
export class RunesListComponent implements OnInit {
  runeForm: FormGroup;
  public runes: Array<any>;
  private rune: object;
  private posts = 10;
  public needPaginate = false;
  private userId: number;
  public loggedIn = false;
  constructor(
    private cs: CtabuilderService, private fb: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
      this.userId = this.auth.getUserId();
      this.runeForm = this.fb.group({
        runeset: ['damage'],
        primary: ['atk'],
        star: ['0'],
        level: ['0'],
        secondary1: ['atk'],
        secondary2: ['atk'],
        secondary3: ['atk'],
      });

      this.getAllRunes();
    }
  }

  getAllRunes(): void {
    this.cs.getRunesByUser(this.userId, this.posts).subscribe(res =>  {
      console.log(res.body);
      this.runes = res.body;
    });
  }

  addRune(): void {
    const val = this.runeForm.value;
    console.log(val);
    if (val.runeset && val.primary && val.star && val.level) {
      this.rune = {
        title: `${val.runeset}`,
        status : 'publish',
        fields : {
          name: `${val.runeset}`,
          star: `${val.star}`,
          level: `${val.level}`,
          primary: `${val.primary}`
        },
      };
    }
    this.cs.createRune(this.rune).subscribe(res => { });

    if (this.userId) {
      this.getAllRunes();
    }

  }

}
