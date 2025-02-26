import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Blog, BlogService } from 'src/app/services/blog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBlogModalComponent } from './edit-blog-modal/edit-blog-modal.component';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css'],
  providers: [BlogService]
})
export class BlogHomeComponent implements OnInit {
  blogs$: Observable<Blog[]>;

  constructor(public auth: AuthService, private blogService: BlogService, private modalService: NgbModal) {
  }

  

  ngOnInit(): void {
    this.blogs$ = this.blogService.blogs$;
  }

  editBlog(blog: Blog): void {
    const modalRef = this.modalService.open(EditBlogModalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.blogToEdit = { ...blog };
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  deleteBlog(blog: Blog): void {
    if (confirm("Are you sure you want to delete this blog?")) {
      this.blogService.deleteBlog(blog);
    }
  }
}
