import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountVatComponent } from './count-vat.component';

describe('CountVatComponent', () => {
  let component: CountVatComponent;
  let fixture: ComponentFixture<CountVatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountVatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
