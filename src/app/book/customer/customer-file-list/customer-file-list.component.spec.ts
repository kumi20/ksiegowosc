import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFileListComponent } from './customer-file-list.component';

describe('CustomerFileListComponent', () => {
  let component: CustomerFileListComponent;
  let fixture: ComponentFixture<CustomerFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
