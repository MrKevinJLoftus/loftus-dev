import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoresComponent } from './pages/chores/Chores.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AuthGuard } from './shared/auth/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule), data: { title: 'Blog' } },
  { path: 'projects', component: ProjectsComponent, data: { title: 'Projects' } },
  { path: 'chores', component: ChoresComponent, data: { title: 'Chore Tracker' } },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: { title: 'Login' } },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
