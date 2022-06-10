import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChoresComponent } from './Chores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: ChoresComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
