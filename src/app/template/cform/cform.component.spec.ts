import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CformTemplateComponent } from './cform.component';

describe('CformComponent', () => {
  let component: CformTemplateComponent;
  let fixture: ComponentFixture<CformTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CformTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CformTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
