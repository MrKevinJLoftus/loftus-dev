import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/shared/models/blog.model';
import { BlogService } from 'src/app/shared/services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-blog-post',
  templateUrl: './create-blog-post.component.html',
  styleUrls: ['./create-blog-post.component.scss']
})
export class CreateBlogPostComponent implements OnInit {

  postForm: FormGroup;
  post: BlogPost;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder
    ) {
      this.postForm = this.fb.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        tags: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

}
