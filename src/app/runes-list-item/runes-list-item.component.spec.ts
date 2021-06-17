import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunesListItemComponent } from './runes-list-item.component';

describe('RunesListItemComponent', () => {
  let component: RunesListItemComponent;
  let fixture: ComponentFixture<RunesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunesListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
