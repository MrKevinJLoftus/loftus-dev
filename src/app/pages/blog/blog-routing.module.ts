import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';
import { AllBlogPostsComponent } from './components/all-blog-posts/all-blog-posts.component';
import { CreateBlogPostComponent } from './components/create-blog-post/create-blog-post.component';

const routes: Routes = [
  { path: '', component: BlogComponent,
    children: [
      { path: 'all', component: AllBlogPostsComponent, pathMatch: 'full' },
      { path: 'create', component: CreateBlogPostComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
