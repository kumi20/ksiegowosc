import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComponentBook } from './company.component';

describe('CompanyComponent', () => {
  let component: CompanyComponentBook;
  let fixture: ComponentFixture<CompanyComponentBook>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyComponentBook ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponentBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
