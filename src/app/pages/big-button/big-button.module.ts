import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { BigButtonComponent } from './big-button.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: BigButtonComponent }
];

const COMPONENTS = [
  BigButtonComponent
];

const MODULES = [
  CommonModule,
  SharedModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES,
    RouterModule.forChild(routes)
  ]
})
export class BigButtonModule { }
