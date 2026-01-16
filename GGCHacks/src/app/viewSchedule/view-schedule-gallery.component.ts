import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface ScheduleItem {
  id?: string;
  title: string;
  date: string;
  description: string;
  photos: string[];
  coverImage?: string;
  order?: number;
  isActive: boolean;
}

@Component({
  selector: 'app-view-schedule-gallery',
  templateUrl: './view-schedule-gallery.component.html',
  styleUrls: ['./view-schedule-gallery.component.css']
})
export class ViewScheduleGalleryComponent implements OnInit {
  scheduleItems: ScheduleItem[] = [];
  isLoading = true;

  selectedItem: ScheduleItem | null = null;
  selectedPhotoIndex = 0;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadScheduleItems();
  }

  loadScheduleItems(): void {
    this.firestore.collection<ScheduleItem>('schedule', ref =>
      ref.where('isActive', '==', true).orderBy('order', 'asc')
    )
      .valueChanges({ idField: 'id' })
      .subscribe({
        next: (items) => {
          this.scheduleItems = items;
          this.isLoading = false;
        },
        error: () => {
          // Fallback if compound index/order isn't available
          this.firestore.collection<ScheduleItem>('schedule', ref =>
            ref.where('isActive', '==', true)
          )
            .valueChanges({ idField: 'id' })
            .subscribe(items => {
              this.scheduleItems = items.sort((a, b) => (a.order || 999) - (b.order || 999));
              this.isLoading = false;
            });
        }
      });
  }

  openLightbox(item: ScheduleItem, photoIndex: number): void {
    this.selectedItem = item;
    this.selectedPhotoIndex = photoIndex;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedItem = null;
    document.body.style.overflow = 'auto';
  }

  nextPhoto(): void {
    if (this.selectedItem) {
      this.selectedPhotoIndex =
        (this.selectedPhotoIndex + 1) % this.selectedItem.photos.length;
    }
  }

  previousPhoto(): void {
    if (this.selectedItem) {
      this.selectedPhotoIndex = this.selectedPhotoIndex === 0
        ? this.selectedItem.photos.length - 1
        : this.selectedPhotoIndex - 1;
    }
  }

  getCoverImage(item: ScheduleItem): string {
    return item.coverImage || item.photos?.[0] || 'assets/images/placeholder.png';
  }
}
