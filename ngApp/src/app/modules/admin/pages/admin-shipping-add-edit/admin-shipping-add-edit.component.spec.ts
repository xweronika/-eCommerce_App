import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShippingAddEditComponent } from './admin-shipping-add-edit.component';

describe('AdminShippingAddEditComponent', () => {
  let component: AdminShippingAddEditComponent;
  let fixture: ComponentFixture<AdminShippingAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShippingAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShippingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
