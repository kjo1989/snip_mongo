import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {VerifyComponent} from './verify/verify/verify/verify.component';

const childRoutes = [
  {
    path: 'verify',
    component: VerifyComponent
  }
];

const routes: Routes = [
  {
    path: '**',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
