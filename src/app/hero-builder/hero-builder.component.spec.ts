import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBuilderComponent } from './hero-builder.component';

describe('HeroBuilderComponent', () => {
  let component: HeroBuilderComponent;
  let fixture: ComponentFixture<HeroBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
