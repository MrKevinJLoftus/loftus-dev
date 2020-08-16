import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/shared/models/blog.model';
import { BlogService } from 'src/app/shared/services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-blog-post',
  templateUrl: './create-blog-post.component.html',
  styleUrls: ['./create-blog-post.component.scss']
})
export class CreateBlogPostComponent implements OnInit {

  postForm: FormGroup;
  post: BlogPost;
  canSubmit = false;
  subscription: Subscription = new Subscription();
  quillModules: any = {
    toolbar: [[{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }], ['bold', 'italic', 'underline', 'strike'], [{ 'align': [] }], ['link', 'image']]
  };

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private authService: AuthService
    ) {
      this.postForm = this.fb.group({
        title: ['', Validators.required],
        author: [''],
        body: ['', Validators.required],
        tags: ['', Validators.required]
      });
      this.canSubmit = this.authService.getIsAuthenticated();
      this.subscription.add(this.authService.getAuthStatusListener().subscribe((authStatus) => {
        this.canSubmit = authStatus;
      }));
      this.handleFormUpdates();
    }

  ngOnInit(): void {
  }

  /**
   * Call service to save blog post.
   */
  submitPost() {
    this.blogService.createNewBlogPost(this.post);
  }

  /**
   * Subscribe to form value changes.
   */
  handleFormUpdates() {
    this.subscription.add(this.postForm.valueChanges.subscribe((formVals) => {
      this.post = {
        title: formVals.title,
        author: formVals.author,
        body: formVals.body,
        tags: formVals.tags
      };
    }));
  }

}
