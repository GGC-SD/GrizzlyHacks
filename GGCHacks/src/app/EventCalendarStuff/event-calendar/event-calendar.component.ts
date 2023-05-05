import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Event} from '../event';
import TreeMap from 'ts-treemap';
import {AuthService} from '../../services/auth.service';
import {range, Subscription} from 'rxjs';
import set = Reflect.set;
import {CalendarServiceService} from '../calendar-service.service';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent {
  isEditing: boolean;
  tempEvent: Event;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(public eventSer: CalendarServiceService, public auth: AuthService) {
    this.tempEvent = new Event();
  }


}
