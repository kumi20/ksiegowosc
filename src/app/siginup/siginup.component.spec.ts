import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginupComponent } from './siginup.component';

describe('SiginupComponent', () => {
  let component: SiginupComponent;
  let fixture: ComponentFixture<SiginupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiginupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiginupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
