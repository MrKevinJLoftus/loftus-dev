import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { PostComponent } from './components/post/post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';

const COMPONENTS = [
  BlogComponent,
  PostComponent
];

const MODULES = [
  CommonModule,
  BlogRoutingModule,
  SharedModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})
export class BlogModule { }
