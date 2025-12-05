import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

interface EventGallery {
  id?: string;
  eventName: string;
  eventDate: string;
  description: string;
  photos: string[];
  coverImage?: string;
  order?: number;
  isActive: boolean;
  createdAt?: Date;
}

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {
  galleries: EventGallery[] = [];
  isLoading = true;
  selectedGallery: EventGallery | null = null;
  selectedPhotoIndex = 0;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadGalleries();
  }

  loadGalleries(): void {
    this.firestore.collection<EventGallery>('galleries', ref =>
      ref.where('isActive', '==', true).orderBy('order', 'asc')
    )
      .valueChanges({ idField: 'id' })
      .subscribe({
        next: (galleries) => {
          this.galleries = galleries;
          this.isLoading = false;
        },
        error: (err) => {
          // Fallback without order if index doesn't exist
          this.firestore.collection<EventGallery>('galleries', ref =>
            ref.where('isActive', '==', true)
          )
            .valueChanges({ idField: 'id' })
            .subscribe(galleries => {
              this.galleries = galleries.sort((a, b) => (a.order || 999) - (b.order || 999));
              this.isLoading = false;
            });
        }
      });
  }

  openLightbox(gallery: EventGallery, photoIndex: number): void {
    this.selectedGallery = gallery;
    this.selectedPhotoIndex = photoIndex;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedGallery = null;
    document.body.style.overflow = 'auto';
  }

  nextPhoto(): void {
    if (this.selectedGallery) {
      this.selectedPhotoIndex =
        (this.selectedPhotoIndex + 1) % this.selectedGallery.photos.length;
    }
  }

  previousPhoto(): void {
    if (this.selectedGallery) {
      this.selectedPhotoIndex = this.selectedPhotoIndex === 0
        ? this.selectedGallery.photos.length - 1
        : this.selectedPhotoIndex - 1;
    }
  }

  getCoverImage(gallery: EventGallery): string {
    return gallery.coverImage || gallery.photos?.[0] || 'assets/images/placeholder.png';
  }
}
