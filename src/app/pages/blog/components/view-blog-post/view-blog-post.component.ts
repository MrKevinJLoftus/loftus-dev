import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Subscription } from 'rxjs';
import { BlogPost } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-view-blog-post',
  templateUrl: './view-blog-post.component.html',
  styleUrls: ['./view-blog-post.component.scss']
})
export class ViewBlogPostComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  post: BlogPost;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const postTitle = params.get('title');
        if (postTitle) {
          this.fetchPost(postTitle);
        }
      })
    );
  }

  ngOnInit(): void {
  }

  fetchPost(title: string) {
    this.blogService.fetchPostByTitle(title).subscribe((res) => {
      this.post = res;
    });
  }

}
