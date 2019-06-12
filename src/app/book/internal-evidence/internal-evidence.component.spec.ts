import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalEvidenceComponent } from './internal-evidence.component';

describe('InternalEvidenceComponent', () => {
  let component: InternalEvidenceComponent;
  let fixture: ComponentFixture<InternalEvidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalEvidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
