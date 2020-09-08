import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Subscription } from 'rxjs';
import { BlogPost } from 'src/app/shared/models/blog.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-view-blog-post',
  templateUrl: './view-blog-post.component.html',
  styleUrls: ['./view-blog-post.component.scss']
})
export class ViewBlogPostComponent {
  subscriptions: Subscription = new Subscription();
  postId: number;
  post: BlogPost;
  canEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService
  ) {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.fetchPost(params);
      })
    );
    this.canEdit = this.authService.getIsAuthenticated();
  }

  /**
   * Fetch post specified in route param.
   */
  fetchPost(params: ParamMap) {
    const routeTitle = params.get('title');
    if (routeTitle) {
      const splitTitle = routeTitle.split('-');
      this.postId = Number(splitTitle[splitTitle.length - 1]);
    }
    if (this.postId) {
      this.blogService.fetchPostById(this.postId).subscribe((res) => {
        this.post = res;
      });
    }
  }

  /**
   * Delete the current post.
   */
  deletePost() {
    if (this.post) {
      this.blogService.deletePost(this.post.id).subscribe((res) => {
        this.router.navigate(['/blog/all']);
      });
    }
  }
}
