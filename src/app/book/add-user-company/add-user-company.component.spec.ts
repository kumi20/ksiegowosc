import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCompanyComponent } from './add-user-company.component';

describe('AddUserCompanyComponent', () => {
  let component: AddUserCompanyComponent;
  let fixture: ComponentFixture<AddUserCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
