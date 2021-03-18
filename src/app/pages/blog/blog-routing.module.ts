import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogComponent } from './blog.component';
import { AllBlogPostsComponent } from './components/all-blog-posts/all-blog-posts.component';
import { CreateBlogPostComponent } from './components/create-blog-post/create-blog-post.component';
import { ViewBlogPostComponent } from './components/view-blog-post/view-blog-post.component';

const routes: Routes = [
  { path: '', component: BlogComponent,
    children: [
      { path: 'all', component: AllBlogPostsComponent, pathMatch: 'full' },
      { path: 'create', component: CreateBlogPostComponent, pathMatch: 'full' },
      { path: 'create/:id', component: CreateBlogPostComponent, pathMatch: 'full' },
      { path: ':title', component: ViewBlogPostComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'all' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
