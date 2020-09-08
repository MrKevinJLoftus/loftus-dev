import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { BlogPost } from '../models/blog.model';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse } from '../models/general.model';

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
  createNewBlogPost(blogPost: BlogPost): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}/blog/post`, { blogPost }).pipe(
      catchError((error) => {
        this.messageService.show(error.message);
        return throwError(error);
      }),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }

  /**
   * Fetch details for one blog post.
   */
  fetchPostById(id: number): Observable<BlogPost> {
    return this.http.get<{ post: BlogPost, message: string }>(`${environment.apiUrl}/blog/post/${id}`).pipe(
      map(res => res.post),
      catchError((error) => {
        this.messageService.show(error.message);
        return throwError(error);
      })
    );
  }

  /**
   * Fetch title and blurb for all blog posts.
   */
  fetchAllPosts(): Observable<BlogPost[]> {
    return this.http.get<{ posts: BlogPost[], message: string }>(`${environment.apiUrl}/blog/posts`).pipe(
      map(res => res.posts),
      catchError((error) => {
        this.messageService.show(error.message);
        console.log(error);
        return throwError(error);
      })
    );
  }

  /**
   * Set a blog post to deleted.
   */
  deletePost(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}/blog/post/${id}`).pipe(
      catchError((error) => {
        this.messageService.show(error.message);
        return throwError(error);
      }),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }

  /**
   * Update an existing blog post.
   * @param id - db id of the blog post to update
   * @param updatedPost - BlogPost object with updated data.
   */
  updatePost(id: number, updatedPost: BlogPost): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${environment.apiUrl}/blog/post/${id}`, { blogPost: updatedPost }).pipe(
      catchError((error) => {
        this.messageService.show(error.message);
        return throwError(error);
      }),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }
}
