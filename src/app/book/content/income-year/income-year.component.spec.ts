import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeYearComponent } from './income-year.component';

describe('IncomeYearComponent', () => {
  let component: IncomeYearComponent;
  let fixture: ComponentFixture<IncomeYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
