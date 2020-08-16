import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CreateBlogPostComponent } from './components/create-blog-post/create-blog-post.component';
import { AllBlogPostsComponent } from './components/all-blog-posts/all-blog-posts.component';
import { EditorModule } from 'primeng/editor';

const COMPONENTS = [
  BlogComponent,
  PostComponent
];

const MODULES = [
  CommonModule,
  BlogRoutingModule,
  SharedModule,
  EditorModule
];

@NgModule({
  declarations: [...COMPONENTS, CreateBlogPostComponent, AllBlogPostsComponent],
  imports: [...MODULES]
})
export class BlogModule { }
