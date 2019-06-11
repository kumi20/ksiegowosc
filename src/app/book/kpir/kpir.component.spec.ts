import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpirComponent } from './kpir.component';

describe('KpirComponent', () => {
  let component: KpirComponent;
  let fixture: ComponentFixture<KpirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
