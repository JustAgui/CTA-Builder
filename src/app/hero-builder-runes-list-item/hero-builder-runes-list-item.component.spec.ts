import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBuilderRunesListItemComponent } from './hero-builder-runes-list-item.component';

describe('HeroBuilderRunesListItemComponent', () => {
  let component: HeroBuilderRunesListItemComponent;
  let fixture: ComponentFixture<HeroBuilderRunesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroBuilderRunesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBuilderRunesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
