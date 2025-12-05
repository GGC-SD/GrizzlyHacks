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

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    console.log("📢 Loading sponsors...");
    this.firestore.collection<Sponsor>('sponsors', ref =>
      ref.where('isActive', '==', true).orderBy('priority', 'asc')
    )
      .valueChanges({ idField: 'id' })
      .subscribe({
        next: (data) => {
          console.log('Firestore sponsors:', data);
          this.sponsors = data;
        },
        error: (err) => console.error('❌ Failed to load sponsors:', err)
      });
  }
}
