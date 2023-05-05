import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Timestamp } from '@angular/fire/firestore';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-blog-posting-page',
  templateUrl: './blog-posting-page.component.html',
  styleUrls: ['./blog-posting-page.component.css']
})
export class BlogPostingPageComponent {

  blogPostingForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private blogService: BlogService) {
    this.blogPostingForm = fb.group({
      blogTitle: ['', Validators.required, Validators.maxLength(50)],
      blogAuthor: ['', Validators.required, Validators.maxLength(50)],
      blogContent:['', Validators.required]
    });
  }

  postBlog(): void {
    if (this.blogPostingForm.invalid) {
      alert('Please fill out all fields');    
    }
    const blogTitle: string = this.blogPostingForm.get('blogTitle').value;
    const blogAuthor: string = this.blogPostingForm.get('blogAuthor').value;
    const blogContent: string = this.blogPostingForm.get('blogContent').value;
    this.blogService.addBlog(blogTitle, blogAuthor, blogContent);
    alert('Blog posted successfully');
    this.blogPostingForm.reset();
  }
}
