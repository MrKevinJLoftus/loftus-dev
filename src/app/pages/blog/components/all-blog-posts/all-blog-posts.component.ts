import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { BlogPostSummary } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-all-blog-posts',
  templateUrl: './all-blog-posts.component.html',
  styleUrls: ['./all-blog-posts.component.scss']
})
export class AllBlogPostsComponent implements OnInit {
  posts: BlogPostSummary[] = [];

  constructor(private blogService: BlogService) {
    this.blogService.fetchAllPosts().subscribe(res => {
      this.posts = res;
    });
  }

  ngOnInit(): void {
  }

}
