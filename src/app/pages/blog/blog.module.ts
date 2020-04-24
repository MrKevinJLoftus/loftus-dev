import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { BlogRoutingModule } from './blog-routing.module';
import { MarkdownModule } from 'ngx-markdown';

const COMPONENTS = [
  BlogComponent,
  PostComponent
];

const MODULES = [
  CommonModule,
  MaterialModule,
  BlogRoutingModule,
  MarkdownModule.forRoot()
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class BlogModule { }
