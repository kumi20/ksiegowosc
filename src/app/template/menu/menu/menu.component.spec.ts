import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuParent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuParent;
  let fixture: ComponentFixture<MenuParent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuParent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuParent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
