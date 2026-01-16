import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewScheduleGalleryComponent } from './view-schedule-gallery.component';

describe('ViewScheduleGalleryComponent', () => {
  let component: ViewScheduleGalleryComponent;
  let fixture: ComponentFixture<ViewScheduleGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewScheduleGalleryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewScheduleGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
