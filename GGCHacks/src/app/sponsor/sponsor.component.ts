import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Sponsor {
  id: string;
  name: string;
  imagePath: string;
  isActive: boolean;
  priority: number;
  link?: string;
}

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  sponsors: Sponsor[] = [];
  sponsorsLoaded = false;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors(): void {
    console.log('Loading sponsors...');
    this.sponsorsLoaded = false;

    // Try the optimal query with index
    this.firestore.collection<Sponsor>('sponsors', ref =>
      ref.where('isActive', '==', true).orderBy('priority', 'asc')
    )
      .valueChanges({ idField: 'id' })
      .subscribe({
        next: (data) => {
          console.log('Firestore sponsors:', data);
          this.sponsors = data;
          this.sponsorsLoaded = true;
        },
        error: (err) => {
          console.warn('Index query failed, trying fallback:', err);
          // Fallback if index doesn't exist - manually sort
          this.firestore.collection<Sponsor>('sponsors', ref =>
            ref.where('isActive', '==', true)
          )
            .valueChanges({ idField: 'id' })
            .subscribe({
              next: (data) => {
                console.log('Firestore sponsors (fallback):', data);
                this.sponsors = data.sort((a, b) =>
                  (a.priority || 999) - (b.priority || 999)
                );
                this.sponsorsLoaded = true;
              },
              error: (fallbackErr) => {
                console.error('Failed to load sponsors:', fallbackErr);
                this.sponsors = [];
                this.sponsorsLoaded = true;
              }
            });
        }
      });
  }
}
