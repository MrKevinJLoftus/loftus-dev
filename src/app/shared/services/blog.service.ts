import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { BlogPost, BlogPostSummary } from '../models/blog.model';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
    return this.http.post(`${environment.apiUrl}/blog/post`, { blogPost }).pipe(
      catchError((error) => {
        this.messageService.show(error);
        return throwError(error);
      })
    );
  }

  /**
   * Fetch details for one blog post.
   */
  fetchPostByTitle(title: string): Observable<BlogPost> {
    return this.http.get<{ post: BlogPost, message: string }>(`${environment.apiUrl}/blog/post/${title}`).pipe(
      map(res => res.post),
      catchError((error) => {
        this.messageService.show(error);
        return throwError(error);
      })
    );
  }

  /**
   * Fetch title and blurb for all blog posts.
   */
  fetchAllPosts(): Observable<BlogPostSummary[]> {
    return this.http.get<{ posts: BlogPostSummary[], message: string }>(`${environment.apiUrl}/blog/posts`).pipe(
      map(res => res.posts),
      catchError((error) => {
        this.messageService.show(error);
        return throwError(error);
      })
    );
  }
}
