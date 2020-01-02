import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCustomerAddComponent } from './contact-customer-add.component';

describe('ContactCustomerAddComponent', () => {
  let component: ContactCustomerAddComponent;
  let fixture: ComponentFixture<ContactCustomerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCustomerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
