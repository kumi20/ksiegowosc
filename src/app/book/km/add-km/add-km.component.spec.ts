import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKmComponent } from './add-km.component';

describe('AddKmComponent', () => {
  let component: AddKmComponent;
  let fixture: ComponentFixture<AddKmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
