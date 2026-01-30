import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-faq',
  templateUrl: './faq-section.html',
  styleUrls: ['./faq-section.css']
})
export class FaqComponent implements OnInit {
  faqs: any[] = [];
  faqsLoaded = false;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    console.log('Loading FAQs...');
    this.faqsLoaded = false;

    // Try the optimal query with index
    this.firestore.collection('faqs', ref =>
      ref.where('isActive', '==', true).orderBy('order', 'asc')
    )
      .valueChanges({ idField: 'id' })
      .subscribe({
        next: (data: any[]) => {
          console.log('Firestore FAQs:', data);
          this.faqs = data;
          this.faqsLoaded = true;
        },
        error: (err) => {
          console.warn('Index query failed, trying fallback:', err);
          // Fallback if index doesn't exist - manually sort
          this.firestore.collection('faqs', ref =>
            ref.where('isActive', '==', true)
          )
            .valueChanges({ idField: 'id' })
            .subscribe({
              next: (data: any[]) => {
                console.log('Firestore FAQs (fallback):', data);
                this.faqs = data.sort((a: any, b: any) =>
                  (a.order || 999) - (b.order || 999)
                );
                this.faqsLoaded = true;
              },
              error: (fallbackErr) => {
                console.error('Failed to load FAQs:', fallbackErr);
                this.faqs = [];
                this.faqsLoaded = true;
              }
            });
        }
      });
  }

  toggleAnswer(faq: any): void {
    faq.open = !faq.open;
  }
}
