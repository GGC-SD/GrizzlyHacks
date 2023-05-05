import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../../../environments/environment';
import { EventCalendarComponent } from './event-calendar.component';
import { CalendarServiceService } from '../calendar-service.service';
import { AuthService } from '../../services/auth.service';

describe('EventCalendarComponent', () => {
  let component: EventCalendarComponent;
  let fixture: ComponentFixture<EventCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCalendarComponent],
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [CalendarServiceService, AuthService, AngularFirestore],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
