import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDetailsComponent } from './special-details.component';

describe('SpecialDetailsComponent', () => {
  let component: SpecialDetailsComponent;
  let fixture: ComponentFixture<SpecialDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
