import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCustomerComponent } from './add-user-customer.component';

describe('AddUserCustomerComponent', () => {
  let component: AddUserCustomerComponent;
  let fixture: ComponentFixture<AddUserCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
