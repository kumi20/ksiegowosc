import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonityComponent } from './monity.component';

describe('MonityComponent', () => {
  let component: MonityComponent;
  let fixture: ComponentFixture<MonityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
