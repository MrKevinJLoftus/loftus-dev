import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MetrixComponent } from './metrix.component';
import { CreateGoalComponent } from './components/create-goal/create-goal.component';
import { AllGoalsComponent } from './components/all-goals/all-goals.component';

const routes: Routes = [
  { path: '', component: MetrixComponent,
    children: [
      { path: 'all', component: AllGoalsComponent, pathMatch: 'full' },
      { path: 'create', component: CreateGoalComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'all' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetrixRoutingModule { }
