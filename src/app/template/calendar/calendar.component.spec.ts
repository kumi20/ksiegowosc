import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTemplateComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarTemplateComponent;
  let fixture: ComponentFixture<CalendarTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
