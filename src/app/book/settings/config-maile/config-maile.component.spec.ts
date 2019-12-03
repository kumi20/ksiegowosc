import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMaileComponent } from './config-maile.component';

describe('ConfigMaileComponent', () => {
  let component: ConfigMaileComponent;
  let fixture: ComponentFixture<ConfigMaileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigMaileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
