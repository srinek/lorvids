import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSlotsComponent } from './staff-slots.component';

describe('StaffSlotsComponent', () => {
  let component: StaffSlotsComponent;
  let fixture: ComponentFixture<StaffSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
