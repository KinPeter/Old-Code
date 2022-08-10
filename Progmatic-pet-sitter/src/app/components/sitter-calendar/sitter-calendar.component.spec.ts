import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterCalendarComponent } from './sitter-calendar.component';

describe('SitterCalendarComponent', () => {
  let component: SitterCalendarComponent;
  let fixture: ComponentFixture<SitterCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitterCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
