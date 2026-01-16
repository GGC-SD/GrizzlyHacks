import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventGalleryComponent } from 'src/app/event-gallery/event-gallery/event-gallery.component';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService, Blog } from 'src/app/services/blog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

class MockAuthService {}
class MockBlogService {
  blogs$ = of<Blog[]>([]);
}
class MockNgbModal {}

describe('BlogHomeComponent', () => {
  let component: EventGalleryComponent;
  let fixture: ComponentFixture<EventGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventGalleryComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: BlogService, useClass: MockBlogService },
        { provide: NgbModal, useClass: MockNgbModal },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
