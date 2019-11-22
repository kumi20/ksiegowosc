import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFvComponent } from './search-fv.component';

describe('SearchFvComponent', () => {
  let component: SearchFvComponent;
  let fixture: ComponentFixture<SearchFvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
