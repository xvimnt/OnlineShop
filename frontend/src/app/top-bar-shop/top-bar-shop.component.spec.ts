import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarShopComponent } from './top-bar-shop.component';

describe('TopBarShopComponent', () => {
  let component: TopBarShopComponent;
  let fixture: ComponentFixture<TopBarShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
