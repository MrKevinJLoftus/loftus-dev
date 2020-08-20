import { Component, Input } from '@angular/core';
import { BlogPost } from 'src/app/shared/models/blog.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post: BlogPost;

  constructor() { }

}
