import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/app/shared/models/blog.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<BlogPost>;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.fetchPostByTitle(params.get('title'))
    ));
  }

}
