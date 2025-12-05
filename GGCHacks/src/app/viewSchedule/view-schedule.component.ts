import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TimelineService, TimelineEvent } from '../services/timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {
  events: TimelineEvent[] = [];
  flyer: any = null;
  flyerLoaded = false; // 🔹 controls shimmer visibility

  constructor(
    private firestore: AngularFirestore,
    private timelineService: TimelineService
  ) {}

  ngOnInit(): void {
    this.loadFlyer();
    this.loadTimelineEvents();
  }

  loadFlyer() {
    this.firestore.collection('timelineflyer', ref => ref.where('isActive', '==', true).limit(1))
      .valueChanges()
      .subscribe({
        next: flyers => {
          if (flyers && flyers.length > 0) {
            this.flyer = flyers[0];
          }
          this.flyerLoaded = true;
        },
        error: err => {
          console.error('Failed to load flyer:', err);
          this.flyerLoaded = true;
        }
      });
  }

  loadTimelineEvents() {
    this.timelineService.getEvents().subscribe({
      next: events => {
        this.events = events.sort(
          (a, b) => a.startTime.toDate().getTime() - b.startTime.toDate().getTime()
        );
      },
      error: err => console.error('Failed to load events:', err)
    });
  }

  seedTimelineFlyers() {
    const flyers = [
      {
        id: '4',
        name: 'GGC Hackathon Schedule',
        imagePath: 'assets/flyers/GGCEvent1.png',
        isActive: true,
        priority: 1,
        uploadedAt: '2025-01-15'
      }
    ];

    flyers.forEach(flyer => {
      this.firestore
        .collection('timelineflyer')
        .doc(flyer.id)
        .set(flyer)
        .then(() => console.log(`Seeded flyer: ${flyer.name}`))
        .catch(err => console.error('Error seeding flyer:', err));
    });
  }

  selectedFlyer: any = null;

  openFlyerModal(flyer: any) {
    this.selectedFlyer = flyer;
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  closeFlyerModal() {
    this.selectedFlyer = null;
    document.body.style.overflow = 'auto';
  }

}
