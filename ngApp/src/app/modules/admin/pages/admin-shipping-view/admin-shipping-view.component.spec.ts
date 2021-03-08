import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShippingViewComponent } from './admin-shipping-view.component';

describe('AdminShippingViewComponent', () => {
  let component: AdminShippingViewComponent;
  let fixture: ComponentFixture<AdminShippingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShippingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShippingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
