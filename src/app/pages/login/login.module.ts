import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LoginFormComponent } from './components/login/login-form.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

const MODULES = [
  SharedModule
];

const COMPONENTS = [
  LoginComponent,
  LoginFormComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES,
    RouterModule.forChild(routes)
  ],
  exports: [...MODULES, ...COMPONENTS, RouterModule]
})
export class LoginModule { }
