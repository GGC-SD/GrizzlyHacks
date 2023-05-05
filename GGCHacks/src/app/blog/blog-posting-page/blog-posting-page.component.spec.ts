import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogPostingPageComponent } from './blog-posting-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class MockAuthService {}
class MockBlogService {}
class MockAngularFirestore {}

describe('BlogPostingPageComponent', () => {
  let component: BlogPostingPageComponent;
  let fixture: ComponentFixture<BlogPostingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogPostingPageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: BlogService, useClass: MockBlogService },
        { provide: AngularFirestore, useClass: MockAngularFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPostingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
