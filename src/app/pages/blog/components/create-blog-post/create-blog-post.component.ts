import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/shared/models/blog.model';
import { BlogService } from 'src/app/shared/services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog-post',
  templateUrl: './create-blog-post.component.html',
  styleUrls: ['./create-blog-post.component.scss']
})
export class CreateBlogPostComponent implements OnInit {

  postForm: FormGroup;
  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  post: BlogPost;
  canSubmit = false;
  subscription: Subscription = new Subscription();
  quillModules: any = {
    toolbar: [[{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }], ['bold', 'italic', 'underline', 'strike'], [{ 'align': [] }], ['link', 'image']]
  };

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
    ) {
      this.postForm = this.fb.group({
        title: ['', Validators.required],
        body: ['', Validators.required]
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
    if (this.postForm.valid) {
      this.blogService.createNewBlogPost(this.post).subscribe((res) => {
        this.messageService.show(res.message);
        this.router.navigate(['/blog/all']);
      });
    } else {
      this.messageService.show('Blog post title and body are required fields.');
    }
  }

  /**
   * Subscribe to form value changes.
   */
  handleFormUpdates() {
    this.subscription.add(this.postForm.valueChanges.subscribe((formVals) => {
      this.post = {
        title: formVals.title,
        body: formVals.body,
        tags: this.tags,
        createdDate: new Date(),
        author: 'Anonymous'
      };
    }));
  }

  /**
   * Add a tag for the blog post.
   */
  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = (event.value || '').trim();
    // add tag to array
    if (!!value) {
      this.tags.push(value);
    }
    // reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove a tag from the blog post.
   * @param tag
   */
  removeTag(tag: string) {
    const tagIndex = this.tags.indexOf(tag);
    if (tagIndex > -1) {
      this.tags.splice(tagIndex, 1);
    }
  }
}
