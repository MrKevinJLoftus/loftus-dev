import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetrixComponent } from './metrix.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';

const COMPONENTS = [
  MetrixComponent
];

const MODULES = [
  CommonModule,
  SharedModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})
export class MetrixModule { }
