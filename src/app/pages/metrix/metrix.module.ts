import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetrixComponent } from './metrix.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { GoalUpdateComponent } from './components/goal-update/goal-update.component';
import { CreateGoalComponent } from './components/create-goal/create-goal.component';
import { MetrixRoutingModule } from './metrix-routing.module';
import { AllGoalsComponent } from './components/all-goals/all-goals.component';

const COMPONENTS = [
  MetrixComponent
];

const MODULES = [
  CommonModule,
  SharedModule,
  MetrixRoutingModule
];

@NgModule({
  declarations: [...COMPONENTS, GoalUpdateComponent, CreateGoalComponent, AllGoalsComponent],
  imports: [...MODULES]
})
export class MetrixModule { }
