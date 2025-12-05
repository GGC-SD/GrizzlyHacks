import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduleComponent } from './view-schedule.component';

describe('AdminTimelineComponent', () => {
  let component: ViewScheduleComponent;
  let fixture: ComponentFixture<ViewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
