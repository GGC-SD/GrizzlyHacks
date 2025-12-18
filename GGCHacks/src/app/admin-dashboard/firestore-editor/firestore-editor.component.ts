import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface FirestoreDocument {
  documentId?: string;
  order?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-firestore-editor',
  templateUrl: './firestore-editor.component.html',
  styleUrls: ['./firestore-editor.component.css']
})
export class FirestoreEditorComponent implements OnInit {
  selectedCollection = '';
  firestoreDocs: FirestoreDocument[] = [];
  isDragging = false;
  isSaving = false;

  // Define the order of fields to display for each collection
  private fieldOrder = {
    faqs: ['question', 'answer', 'isActive'],
    sponsors: ['name', 'tier', 'website', 'logoUrl', 'isActive'],
    flyers: ['title', 'description', 'imageUrl', 'linkUrl', 'isActive'],
    galleries: ['eventName', 'eventDate', 'description', 'coverImage', 'photos', 'isActive']
  };

  // Fields to exclude from display for each collection
  private excludedFields = {
    common: ['documentId', 'order', 'open'], // Common fields to always exclude
    faqs: [], // No additional exclusions for FAQs
    sponsors: ['id', 'priority'], // Exclude these for sponsors
    flyers: ['id', 'priority', 'uploadedDate', 'uploadDate', 'createdAt', 'updatedAt'] // Exclude these for flyers
  };

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {}

  loadFirestoreCollection(collection: string): void {
    if (!collection) {
      this.firestoreDocs = [];
      this.selectedCollection = '';
      return;
    }

    this.selectedCollection = collection;

    // Subscribe to real-time updates from Firestore
    this.firestore.collection<FirestoreDocument>(collection)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as FirestoreDocument;
          const documentId = a.payload.doc.id;
          return { documentId, ...data };
        }))
      )
      .subscribe(docs => {
        // Sort by order field if it exists
        this.firestoreDocs = docs.sort((a, b) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          return orderA - orderB;
        });

        // If documents don't have order, assign them
        if (this.firestoreDocs.some(doc => doc.order === undefined)) {
          this.assignOrderValues();
        }
      });
  }

  onDrop(event: CdkDragDrop<FirestoreDocument[]>): void {
    // Move item in the array
    moveItemInArray(this.firestoreDocs, event.previousIndex, event.currentIndex);

    // Update order values based on new positions
    this.updateOrderValues();
  }

  assignOrderValues(): void {
    this.firestoreDocs.forEach((doc, index) => {
      doc.order = index + 1;
    });
  }

  updateOrderValues(): void {
    // Update order based on new positions
    this.firestoreDocs.forEach((doc, index) => {
      doc.order = index + 1;
    });

    // Save all documents with new order values
    this.saveAllOrders();
  }

  async saveAllOrders(): Promise<void> {
    this.isSaving = true;

    try {
      // Create batch update for efficiency
      const batch = this.firestore.firestore.batch();

      this.firestoreDocs.forEach(doc => {
        if (doc.documentId) {
          const docRef = this.firestore.firestore
            .collection(this.selectedCollection)
            .doc(doc.documentId);

          const updateData = { ...doc };
          delete updateData.documentId;

          batch.update(docRef, updateData);
        }
      });

      await batch.commit();
      console.log('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order. Please try again.');
    } finally {
      this.isSaving = false;
    }
  }

  async updateFirestoreDoc(doc: FirestoreDocument, silent = false): Promise<void> {
    if (this.isFlyerCollection) {
      if (this.firestoreDocs.length < 1) {
        alert("At least 1 flyer is required.");
        return;
      }
      if (this.firestoreDocs.length > 3) {
        alert("You cannot exceed 3 flyers.");
        return;
      }
    }

    if (!doc.documentId) return;

    try {
      const updateData = { ...doc };
      delete updateData.documentId;

      await this.firestore.collection(this.selectedCollection)
        .doc(doc.documentId)
        .update(updateData);

      if (!silent) {
        alert('Document updated successfully!');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      if (!silent) {
        alert('Failed to update document. Please try again.');
      }
    }
  }

  async deleteFirestoreDoc(doc: FirestoreDocument): Promise<void> {
    if (this.isFlyerCollection && this.firestoreDocs.length <= 1) {
      alert("You must have at least 1 flyer.");
      return;
    }

    if (!doc.documentId) return;

    const confirmDelete = confirm('Are you sure you want to delete this document?');
    if (!confirmDelete) return;

    try {
      await this.firestore.collection(this.selectedCollection)
        .doc(doc.documentId)
        .delete();

      // Remove from local array
      const index = this.firestoreDocs.indexOf(doc);
      if (index > -1) {
        this.firestoreDocs.splice(index, 1);
        // Update order values after deletion
        this.updateOrderValues();
      }

      alert('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document. Please try again.');
    }
  }

  async addNewFaq(): Promise<void> {
    const question = prompt('Enter the FAQ question:');
    if (!question) return;

    const answer = prompt('Enter the FAQ answer:');
    if (!answer) return;

    const newOrder = this.firestoreDocs.length > 0
      ? Math.max(...this.firestoreDocs.map(d => d.order || 0)) + 1
      : 1;

    const newFaq = {
      question,
      answer,
      isActive: true,
      order: newOrder
    };

    try {
      const docRef = await this.firestore.collection('faqs').add(newFaq);
      console.log('New FAQ added with ID:', docRef.id);
      alert('FAQ added successfully!');
    } catch (error) {
      console.error('Error adding FAQ:', error);
      alert('Failed to add FAQ. Please try again.');
    }
  }

  async addNewSponsor(): Promise<void> {
    const name = prompt('Enter the sponsor name:');
    if (!name) return;

    const tier = prompt('Enter the sponsor tier (e.g., Gold, Silver, Bronze):');
    if (!tier) return;

    const website = prompt('Enter the sponsor website URL:');
    const logoUrl = prompt('Enter the sponsor logo URL:');

    const newOrder = this.firestoreDocs.length > 0
      ? Math.max(...this.firestoreDocs.map(d => d.order || 0)) + 1
      : 1;

    const newSponsor = {
      name,
      tier,
      website: website || '',
      logoUrl: logoUrl || '',
      isActive: true,
      order: newOrder
    };

    try {
      const docRef = await this.firestore.collection('sponsors').add(newSponsor);
      console.log('New sponsor added with ID:', docRef.id);
      alert('Sponsor added successfully!');
    } catch (error) {
      console.error('Error adding sponsor:', error);
      alert('Failed to add sponsor. Please try again.');
    }
  }

  async addNewFlyer(): Promise<void> {
    if (this.firestoreDocs.length >= 3) {
      alert("You can only have up to 3 flyers.");
      return;
    }

    const title = prompt('Enter the flyer title:');
    if (!title) return;

    const description = prompt('Enter the flyer description:');
    const imageUrl = prompt('Enter the flyer image URL:');
    const linkUrl = prompt('Enter the flyer link URL (optional):');

    const newOrder = this.firestoreDocs.length > 0
      ? Math.max(...this.firestoreDocs.map(d => d.order || 0)) + 1
      : 1;

    const newFlyer = {
      title,
      description: description || '',
      imageUrl: imageUrl || '',
      linkUrl: linkUrl || '',
      isActive: true,
      order: newOrder
    };

    try {
      const docRef = await this.firestore.collection('flyers').add(newFlyer);
      console.log('New flyer added with ID:', docRef.id);
      alert('Flyer added successfully!');
    } catch (error) {
      console.error('Error adding flyer:', error);
      alert('Failed to add flyer. Please try again.');
    }
  }

  async addNewGallery(): Promise<void> {
    const eventName = prompt('Enter the event name (e.g., "GGC Hacks 2024"):');
    if (!eventName) return;

    const eventDate = prompt('Enter the event date (e.g., "November 9, 2024"):');
    if (!eventDate) return;

    const description = prompt('Enter a brief description:');

    const newOrder = this.firestoreDocs.length > 0
      ? Math.max(...this.firestoreDocs.map(d => d.order || 0)) + 1
      : 1;

    const newGallery = {
      eventName,
      eventDate,
      description: description || '',
      coverImage: '',
      photos: [],
      isActive: true,
      order: newOrder
    };

    try {
      const docRef = await this.firestore.collection('galleries').add(newGallery);
      console.log('New gallery added with ID:', docRef.id);
      alert('Gallery added successfully! Add photos using the editor.');
    } catch (error) {
      console.error('Error adding gallery:', error);
      alert('Failed to add gallery. Please try again.');
    }
  }

  getKeys(doc: any): string[] {
    // Get the predefined field order for this collection
    const orderedFields = this.fieldOrder[this.selectedCollection as keyof typeof this.fieldOrder] || [];

    // Get all keys from the document
    const allKeys = Object.keys(doc);

    // Get excluded fields for this collection
    const collectionExclusions = this.excludedFields[this.selectedCollection as keyof typeof this.excludedFields] || [];
    const commonExclusions = this.excludedFields.common;

    // Combine all exclusions
    const allExclusions = [...commonExclusions, ...collectionExclusions];

    // Filter out excluded fields
    const availableKeys = allKeys.filter(key => !allExclusions.includes(key));

    // Sort keys based on predefined order
    // First add ordered fields that exist in the document
    const sortedKeys: string[] = [];
    orderedFields.forEach(field => {
      if (availableKeys.includes(field)) {
        sortedKeys.push(field);
      }
    });

    // Then add any remaining fields that weren't in the predefined order
    availableKeys.forEach(key => {
      if (!sortedKeys.includes(key)) {
        sortedKeys.push(key);
      }
    });

    return sortedKeys;
  }

  getInputType(key: string, value: any): string {
    if (key === 'photos' && Array.isArray(value)) return 'photoArray';
    if (key === 'coverImage') return 'url';
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'string') {
      if (key.toLowerCase().includes('url') ||
        key.toLowerCase().includes('link') ||
        key.toLowerCase().includes('website')) {
        return 'url';
      }
      if (value.length > 100 ||
        key.toLowerCase().includes('answer') ||
        key.toLowerCase().includes('description') ||
        key.toLowerCase().includes('content')) {
        return 'textarea';
      }
    }
    return 'text';
  }

  addPhotoToGallery(doc: any): void {
    const photoUrl = prompt('Enter photo URL:');
    if (photoUrl) {
      if (!doc.photos) {
        doc.photos = [];
      }
      doc.photos.push(photoUrl.trim());
    }
  }

  removePhotoFromGallery(doc: any, index: number): void {
    if (doc.photos && doc.photos.length > index) {
      doc.photos.splice(index, 1);
    }
  }

  formatFieldLabel(key: string): string {
    // Convert camelCase to Title Case
    // e.g., "firstName" becomes "First Name"
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  // Helper method to get display name for document
  getDocumentDisplayName(doc: FirestoreDocument): string {
    if (this.selectedCollection === 'faqs' && doc.question) {
      return doc.question.substring(0, 50) + (doc.question.length > 50 ? '...' : '');
    }
    if (this.selectedCollection === 'sponsors' && doc.name) {
      return doc.name;
    }
    if (this.selectedCollection === 'flyers' && doc.title) {
      return doc.title;
    }
    return `Document ${doc.order || ''}`;
  }

  // === Flyer Limits ===
  get isFlyerCollection(): boolean {
    return this.selectedCollection === 'flyers';
  }

  get flyerLimitReached(): boolean {
    return this.isFlyerCollection && this.firestoreDocs.length >= 3;
  }

  get flyerMinimumReached(): boolean {
    return this.isFlyerCollection && this.firestoreDocs.length <= 1;
  }

}


