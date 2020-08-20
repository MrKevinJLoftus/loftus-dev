import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { BlogPost } from 'src/app/shared/models/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-blog-posts',
  templateUrl: './all-blog-posts.component.html',
  styleUrls: ['./all-blog-posts.component.scss']
})
export class AllBlogPostsComponent implements OnInit {
  posts: BlogPost[] = [];

  constructor(private blogService: BlogService, private router: Router) {
    this.blogService.fetchAllPosts().subscribe(res => {
      this.posts = res;
    });
  }

  ngOnInit(): void {
  }

  viewPost(post: BlogPost) {
    this.router.navigate(['/blog', `${post.kebabTitle}-${post.id}`]);
  }

}
