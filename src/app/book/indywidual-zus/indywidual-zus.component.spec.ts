import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndywidualZusComponent } from './indywidual-zus.component';

describe('IndywidualZusComponent', () => {
  let component: IndywidualZusComponent;
  let fixture: ComponentFixture<IndywidualZusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndywidualZusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndywidualZusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
