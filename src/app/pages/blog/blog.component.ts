import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  title = 'Blog';
  // TODO: remove dummy data
  mockBlogPost = {
    title: 'First Blog Post!',
    author: 'Kevin Loftus',
    keywords: ['start', 'first', 'development'],
    text: `
# First!
Hey everyone, welcome to the blog! It's finally up and running.
`
  };

  constructor() { }

  ngOnInit(): void {
  }

}
