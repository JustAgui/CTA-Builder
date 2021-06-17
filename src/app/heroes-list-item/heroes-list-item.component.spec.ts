import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListItemComponent } from './heroes-list-item.component';

describe('HeroesListItemComponent', () => {
  let component: HeroesListItemComponent;
  let fixture: ComponentFixture<HeroesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
