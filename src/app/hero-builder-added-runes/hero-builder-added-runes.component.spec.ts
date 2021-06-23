import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBuilderAddedRunesComponent } from './hero-builder-added-runes.component';

describe('HeroBuilderAddedRunesComponent', () => {
  let component: HeroBuilderAddedRunesComponent;
  let fixture: ComponentFixture<HeroBuilderAddedRunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroBuilderAddedRunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBuilderAddedRunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
