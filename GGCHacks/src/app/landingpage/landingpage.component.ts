import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})


export class LandingpageComponent implements OnInit {
  flyers: any[] = [];
  flyersLoaded = false;
  selectedFlyer: any = null;

  constructor(
    public router: Router,
    public auth: AuthService,
    private firestore: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    // Handle sponsor scrolling
    this.autoScrollSponsors();

    // Handle feature header animations
    this.initFeatureHeaderScroll();

    this.loadFlyers();

    // this.seedFlyers()
  }

  openFlyerModal(flyer: any) {
    this.selectedFlyer = flyer;
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  closeFlyerModal() {
    this.selectedFlyer = null;
    document.body.style.overflow = 'auto';
  }


  autoScrollSponsors(): void {
    const scrollingWrapper = document.querySelector('.scrolling-wrapper');

    if (scrollingWrapper) {
      const seamlessScroll = () => {
        scrollingWrapper.scrollLeft += 2; // Increment scrollLeft
        if (scrollingWrapper.scrollLeft >= scrollingWrapper.scrollWidth / 2) {
          scrollingWrapper.scrollLeft = 0; // Reset to the start of the duplicated content
        }
      };
      setInterval(seamlessScroll, 20); // Adjust speed as needed
    } else {
      console.log('Scrolling wrapper not found.');
    }
  }

  initFeatureHeaderScroll(): void {
    const featureHeaderSection = document.querySelector('.features-header-section');

    if (featureHeaderSection) {
      const handleScroll = () => {
        const rect = featureHeaderSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          featureHeaderSection.classList.add('in-view');
        } else {
          featureHeaderSection.classList.remove('in-view');
        }
      };

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);

      // Initial check in case it's already in view
      handleScroll();
    } else {
      console.log('Feature header section not found.');
    }
  }

  loadFlyers(): void {
    this.flyersLoaded = false;

    // Try the optimal query with index
    this.firestore.collection('flyers', ref =>
      ref.where('isActive', '==', true).orderBy('order', 'asc')
    )
      .valueChanges({ idField: 'id' })
      .subscribe({
        next: (flyers) => {
          this.flyers = flyers;
          this.flyersLoaded = true;
        },
        error: (err) => {
          // Fallback if index doesn't exist - manually sort
          this.firestore.collection('flyers', ref =>
            ref.where('isActive', '==', true)
          )
            .valueChanges({ idField: 'id' })
            .subscribe({
              next: (flyers) => {
                // Sort by order field manually
                this.flyers = flyers.sort((a: any, b: any) =>
                  (a.order || 999) - (b.order || 999)
                );
                this.flyersLoaded = true;
              },
              error: (fallbackErr) => {
                console.error('Failed to load flyers:', fallbackErr);
                this.flyers = [];
                this.flyersLoaded = true;
              }
            });
        }
      });
  }


  //used to initialize firestore with some flyers
  seedFlyers() {
    const flyersJson = {
      activeFlyers: [
        {
          id: "1",
          name: "GGC Event 1",
          imagePath: "https://i.imgur.com/YNHgBSx.jpeg",
          isActive: true,
          priority: 1,
          uploadedAt: "2025-01-15"
        },
        {
          id: "2",
          name: "GGC Event 2",
          imagePath: "assets/flyers/FakeFlyer1.jpg",
          isActive: true,
          priority: 2,
          uploadedAt: "2025-01-14"
        },
        {
          id: "3",
          name: "GGC Event 3",
          imagePath: "assets/flyers/FakeFlyer1.jpg",
          isActive: true,
          priority: 3,
          uploadedAt: "2025-01-13"
        }
      ]
    }

    const flyersCollection = this.firestore.collection('flyers');

    flyersJson.activeFlyers.forEach(flyer => {
      flyersCollection.doc(flyer.id).set(flyer)   // uses flyer.id as doc ID
        .then(() => console.log(`Uploaded flyer ${flyer.name}`))
        .catch(err => console.error("Error uploading flyer:", err));
    });
  }


  private getFallbackImage(index: number): string {
    const fallbackImages = [
      'assets/images/GGCEvent1.png',
      'assets/images/GGCEvent3.png',
      'assets/images/GGCEvent2.png'
    ];
    return fallbackImages[index] || 'assets/images/GGCEvent1.png';
  }

  private getDefaultFlyers() {
    return [
      {
        name: '24/7 Monitoring',
        imagePath: 'assets/images/GGCEvent1.png',
        isActive: true,
        isFallback: true
      },
      {
        name: 'Connecting Beyond Code',
        imagePath: 'assets/images/GGCEvent3.png',
        isActive: true,
        isFallback: true
      },
      {
        name: 'Sharpening Coding Skills',
        imagePath: 'assets/images/GGCEvent2.png',
        isActive: true,
        isFallback: true
      }
    ];
  }

  onImageError(event: any): void {
    console.log('Image failed to load, using fallback');
    // Fallback to your original static images
    event.target.src = 'assets/images/GGCEvent1.png';
  }

  openExternalLink(url: string): void {
    window.open(url, 'https://ggc.campusgroups.com/feeds?type=club&type_id=35493&tab=about');
  }
}




