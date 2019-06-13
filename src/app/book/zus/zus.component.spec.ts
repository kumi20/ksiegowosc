import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZusComponent } from './zus.component';

describe('ZusComponent', () => {
  let component: ZusComponent;
  let fixture: ComponentFixture<ZusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
