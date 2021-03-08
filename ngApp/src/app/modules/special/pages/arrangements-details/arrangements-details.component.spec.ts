import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangementsDetailsComponent } from './arrangements-details.component';

describe('ArrangementsDetailsComponent', () => {
  let component: ArrangementsDetailsComponent;
  let fixture: ComponentFixture<ArrangementsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangementsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
