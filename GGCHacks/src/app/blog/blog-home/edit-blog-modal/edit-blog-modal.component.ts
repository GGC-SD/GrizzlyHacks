  import { Component, Input, OnInit } from '@angular/core';
  import { FormGroup, FormControl } from '@angular/forms';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  import { Blog, BlogService } from 'src/app/services/blog.service';

  @Component({
    selector: 'app-edit-blog-modal',
    templateUrl: './edit-blog-modal.component.html',
    styleUrls: ['./edit-blog-modal.component.css']
  })
  export class EditBlogModalComponent implements OnInit {
    @Input() blogToEdit: Blog;
    editBlogForm: FormGroup;

    constructor(public activeModal: NgbActiveModal, private blogService: BlogService) { }

    ngOnInit(): void {
      this.editBlogForm = new FormGroup({
        title: new FormControl(this.blogToEdit.title),
        author: new FormControl(this.blogToEdit.author),
        content: new FormControl(this.blogToEdit.content)
      });
    }
    

    save(): void {
      this.blogToEdit.title = this.editBlogForm.value.title;
      this.blogToEdit.author = this.editBlogForm.value.author;
      this.blogToEdit.content = this.editBlogForm.value.content;
      this.blogService.editBlog(this.blogToEdit);
      this.activeModal.close();
    }
    
  }
