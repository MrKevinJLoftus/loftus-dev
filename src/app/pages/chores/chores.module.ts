import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoresComponent } from './chores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateChoreFormComponent } from './components/create-chore-form/create-chore-form.component';
import { CreatePersonFormComponent } from './components/create-person-form/create-person-form.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LogWorkFormComponent } from './components/log-work-form/log-work-form.component';



@NgModule({
  declarations: [
    ChoresComponent,
    DashboardComponent,
    CreateChoreFormComponent,
    CreatePersonFormComponent,
    LogWorkFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChoresModule { }
