import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formUrl: SafeResourceUrl | null = null;

  constructor(
    private firestore: AngularFirestore,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.firestore.doc('formlinks/registrationForm').valueChanges()
      .subscribe((form: any) => {
        if (form && form.embedLink) {
          this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(form.embedLink);
          console.log('Loaded registration form:', form.embedLink);
        } else {
          console.warn('Registration form link not found.');
        }
      });

    console.log("Seeding form link...");

  }

  // seedRegistrationForm() {
  //   const form = {
  //     id: "registrationForm",
  //     name: "Registration Form",
  //     embedLink: "https://docs.google.com/forms/d/e/1FAIpQLSd8ExampleLink/viewform?embedded=true",
  //     isActive: true,
  //     updatedAt: new Date().toISOString()
  //   };
  //
  //   this.firestore.collection('formlinks').doc(form.id).set(form)
  //     .then(() => console.log("Registration form link added to Firestore!"))
  //     .catch(err => console.error("Error adding form link:", err));
  // }
}
