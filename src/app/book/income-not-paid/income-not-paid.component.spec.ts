import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeNotPaidComponent } from './income-not-paid.component';

describe('IncomeNotPaidComponent', () => {
  let component: IncomeNotPaidComponent;
  let fixture: ComponentFixture<IncomeNotPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeNotPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeNotPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
