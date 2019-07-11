import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponentView } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponentView;
  let fixture: ComponentFixture<NewsComponentView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponentView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
