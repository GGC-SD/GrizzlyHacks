import {Injectable, OnDestroy} from '@angular/core';
import TreeMap from 'ts-treemap';
import {Event} from './event';
import {Subscription} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarServiceService implements OnDestroy{

  days: TreeMap<string, Event[]>;
  isEditing: boolean;
  keys: string[];
  sub: Subscription;

  constructor(private afs: AngularFirestore) {
    this.days = new TreeMap< string, Event[]>(((a, b) => this.compare(a, b)));
    this.keys = Array.from(this.days.keys());
    this.isEditing = false;
    this.sub = this.afs.collection<Event>(`events`).valueChanges( ).subscribe(events => this.createEvents(events));
  }


  createEvents(events: Event[]) {
    this.days = new TreeMap<string, Event[]>(((a, b) => this.compare(a, b)));
    events.forEach( event => {
      if (this.days.has(event.day)) {
        this.days.set(event.day, this.days.get(event.day).concat([event]));
      } else {
        this.days.set(event.day, [event]);
      }
    });
    for ( const k  of this.days.keys()) {
      this.days.get(k).sort( (e1, e2) => {
        return this.timeCompare(e1.startTime, e2.startTime);
      });
    }
    this.keys = Array.from(this.days.keys());
    this.keys.sort(((a, b) => this.compare(a, b)));
    console.log(this.keys);
  }

  updateEvent(e: Event) {
    const ref: AngularFirestoreDocument = this.afs.doc(`events/${e.id}`);
    const data = {
      id: e.id,
      title: e.title,
      startTime: e.startTime,
      endTime: e.endTime,
      day: e.day
    }
    ref.update(data);
  }

  deleteEvent(event: Event) {
    const ref: AngularFirestoreDocument = this.afs.doc(`events/${event.id}`);
    ref.delete();
  }




  // just the raw data of the event
  createEvent(e: Event) {
    e.id = this.afs.createId();
    const ref: AngularFirestoreDocument = this.afs.doc(`events/${e.id}`);


    const data = {
      id: e.id,
      title: e.title,
      startTime: e.startTime,
      endTime: e.endTime,
      day: e.day
    }

    ref.set(data, {merge: true});
  }



  compare( a: string,  b: string) {
    let aa = 7;
    let bb = 7;
    a = a.toLocaleLowerCase();
    if (a === 'monday') {
      aa = 0;
    } else if (a === 'tuesday') {
      aa = 1;
    } else if (a === 'wednesday') {
      aa = 2;
    } else if (a === 'thursday') {
      aa = 3;
    } else if (a === 'friday') {
      aa = 4;
    } else if (a === 'saturday') {
      aa = 5;
    } else if (a === 'sunday') {
      aa = 6;
    }

    b = b.toLocaleLowerCase();
    if (b === 'monday') {
      bb = 0;
    } else if (b === 'tuesday') {
      bb = 1;
    } else if (b === 'wednesday') {
      bb = 2;
    } else if (b === 'thursday') {
      bb = 3;
    } else if (b === 'friday') {
      bb = 4;
    } else if (b === 'saturday') {
      bb = 5;
    } else if (b === 'sunday') {
      bb = 6;
    }
    return (aa - bb);
  }

  timeCompare(t1: string, t2: string) {
    const h1 = t1.replace(':', '').replace('PM', '').replace('AM', '');
    const h2 = t2.replace(':', '').replace('PM', '').replace('AM', '');

    let temp1 = +h1;
    let temp2 = +h2;
    if (t1.charAt(5) === 'P') {
      temp1 = temp1 + 1200;
    }
    if (t2.charAt(5) === 'P') {
      temp2 = temp2 + 1200;
    }

    console.log(temp1 - temp2);
    return temp1 - temp2;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
