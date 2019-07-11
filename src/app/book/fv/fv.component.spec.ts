class FakeHttp {
  get(url, options) {}
  post(url, body, options) {}
  put(url, body, options) {}
  delete(url, options) {}
}


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FvComponent } from './fv.component';

describe('FvComponent', () => {
  let component: FvComponent;
  let fixture: ComponentFixture<FvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          
      declarations: [ FvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
  it('should have a message with `warn`', ()=>{
     expect(component).toContain('warn');  
  });    
});
