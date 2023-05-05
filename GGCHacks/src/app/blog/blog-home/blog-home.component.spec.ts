import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogHomeComponent } from './blog-home.component';
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
  let component: BlogHomeComponent;
  let fixture: ComponentFixture<BlogHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogHomeComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: BlogService, useClass: MockBlogService },
        { provide: NgbModal, useClass: MockNgbModal },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
