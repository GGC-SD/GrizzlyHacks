import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EventGallery {
  id?: string;
  eventName: string;
  eventDate: string;
  description: string;
  photos: string[];  // Array of photo URLs
  coverImage?: string;  // Main image for the card
  order?: number;
  isActive: boolean;
  createdAt?: Date;
  author?: string;  // Can be event organizer
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private firestore: AngularFirestore) { }

  // Get all active galleries
  getGalleries(): Observable<EventGallery[]> {
    return this.firestore.collection<EventGallery>('galleries', ref =>
      ref.where('isActive', '==', true)
        .orderBy('order', 'asc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as EventGallery;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Get single gallery by ID
  getGalleryById(id: string): Observable<EventGallery | undefined> {
    return this.firestore.doc<EventGallery>(`galleries/${id}`).valueChanges();
  }

  // Add new gallery
  addGallery(gallery: EventGallery): Promise<any> {
    return this.firestore.collection('galleries').add({
      ...gallery,
      createdAt: new Date()
    });
  }

  // Update gallery
  updateGallery(id: string, gallery: Partial<EventGallery>): Promise<void> {
    return this.firestore.doc(`galleries/${id}`).update(gallery);
  }

  // Delete gallery
  deleteGallery(id: string): Promise<void> {
    return this.firestore.doc(`galleries/${id}`).delete();
  }
}
