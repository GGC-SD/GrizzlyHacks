import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Timestamp } from '@angular/fire/firestore';

export interface Blog {
  documentID: string;
  author: string;
  content: string;
  datePosted: Timestamp;
  edited: Timestamp;
  title: string;
}

// Create a service to manage the blogs collection and count document
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsSubject = new Subject<Blog[]>();
  blogs$: Observable<Blog[]> = this.blogsSubject.asObservable().pipe(startWith([]));

  constructor() {
    // Manually fetch and emit the initial data
    firebase.firestore().collection('blogs').orderBy('datePosted', 'desc').get().then(snapshot => {
      const initialBlogs = snapshot.docs.map(doc => {
        return {
          documentID: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          author: doc.data().author,
          datePosted: doc.data().datePosted,
          edited: doc.data().edited
        } as Blog;
      });
      this.blogsSubject.next(initialBlogs);
    });
  
    // Set up the onSnapshot listener
    firebase.firestore().collection('blogs').orderBy('datePosted', 'desc').onSnapshot(snapshot => {
      const blogs = snapshot.docs.map(doc => {
        return {
          documentID: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          author: doc.data().author,
          datePosted: doc.data().datePosted,
          edited: doc.data().edited
        } as Blog;
      });
      this.blogsSubject.next(blogs);
    });
  }
  

  //Adds a blog to the database
  addBlog(blogTitle: string, blogAuthor: string, blogContent: string): void {
    //Checks if there is a count doc in the blogs collection
    let count = 0;
    firebase.firestore().collection('blogs').doc('count').get().then(doc => {
      //If there is a count doc, get the count and increment it
      if (doc.exists) {
        count = doc.data().count;
        firebase.firestore().collection('blogs').doc('count').update({count: count + 1});
      }
      //If there is no count doc, create one and set the count to 1
      else {
        firebase.firestore().collection('blogs').doc('count').set({count: 1});
      }
      //Create a blog object and add it to the blogs collection
      const blog = {
        documentID: count.toString(),
        title: blogTitle,
        content: blogContent,
        author: blogAuthor,
        datePosted: Timestamp.now(),
        edited: null
      };
      firebase.firestore().collection('blogs').doc(blog.documentID).set(blog);
    });
  }

  //Edits a blog, used the documentID as the title
  editBlog(blog: Blog): void {
    // Create a copy of the blog to avoid modifying the original
    const editedBlog = { ...blog };
    editedBlog.edited = Timestamp.now();

    // Update the blog document
    firebase.firestore().collection('blogs').doc(blog.documentID).update(editedBlog)
    .catch(error => {
      console.log("Error updating blog: ", error);
    });
  }

  //Deletes a blog, used the documentID as the title
  deleteBlog(blog: Blog): void {
    // Delete the blog document
    firebase.firestore().collection('blogs').doc(blog.documentID).delete()
    .catch(error => {
      console.log("Error deleting blog: ", error);
    });
  }
}
