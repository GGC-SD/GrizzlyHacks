import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-faq',
  templateUrl: './faq-section.html',
  styleUrls: ['./faq-section.css']
})
export class FaqComponent implements OnInit {
  faqs: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    console.log('📚 Loading FAQs...');
    this.firestore.collection('faqs', ref => ref.where('isActive', '==', true).orderBy('order', 'asc'))
      .valueChanges({ idField: 'id' })
      .subscribe((data: any[]) => {
        console.log('✅ Firestore FAQs:', data);
        this.faqs = data;
      });
  }

  toggleAnswer(faq: any): void {
    faq.open = !faq.open;
  }
}
