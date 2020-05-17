import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { BlogPost } from '../models/blog.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Create new blog post.
   */
  createNewBlogPost(blogPost: BlogPost) {
    return this.http.post(`${environment.apiUrl}/blog/post`, { blogPost });
  }

  /**
   * Fetch details for one blog post.
   */
  fetchPostByTitle(title: string) {
    return this.http.get(`${environment.apiUrl}/blog/post/${title}`);
  }

  /**
   * Fetch title and blurb for all blog posts.
   */
  fetchAllPosts() {
    return this.http.get(`${environment.apiUrl}/blog/posts`);
  }
}
