import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailsCommentsComponent } from './hero-details-comments.component';

describe('HeroDetailsCommentsComponent', () => {
  let component: HeroDetailsCommentsComponent;
  let fixture: ComponentFixture<HeroDetailsCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetailsCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
