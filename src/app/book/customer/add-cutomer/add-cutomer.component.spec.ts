import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCutomerComponent } from './add-cutomer.component';

describe('AddCutomerComponent', () => {
  let component: AddCutomerComponent;
  let fixture: ComponentFixture<AddCutomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCutomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCutomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
