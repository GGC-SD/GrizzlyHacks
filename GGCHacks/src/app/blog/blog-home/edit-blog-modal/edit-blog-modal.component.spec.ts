import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService, Blog } from 'src/app/services/blog.service';
import { EditBlogModalComponent } from './edit-blog-modal.component';
import { Timestamp } from '@angular/fire/firestore';

class MockNgbActiveModal {}
class MockBlogService {
  editBlog(blog: Blog) {}
}

describe('EditBlogModalComponent', () => {
  let component: EditBlogModalComponent;
  let fixture: ComponentFixture<EditBlogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ EditBlogModalComponent ],
      providers: [
        { provide: NgbActiveModal, useClass: MockNgbActiveModal },
        { provide: BlogService, useClass: MockBlogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBlogModalComponent);
    component = fixture.componentInstance;
    component.blogToEdit = {
      documentID: '1',
      title: 'Test Title',
      author: 'Test Author',
      content: 'Test Content',
      datePosted: Timestamp.fromDate(new Date()),
      edited: null
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize editBlogForm with blogToEdit data', () => {
    expect(component.editBlogForm.value).toEqual({
      title: 'Test Title',
      author: 'Test Author',
      content: 'Test Content'
    });
  });

});
