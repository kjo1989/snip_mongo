import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './components/home/home.module#HomeModule'
  },

  {
    path: 'sign_up',
    loadChildren: './components/register/register.module#RegisterModule'
  },

  {
    path: 'verify',
    loadChildren: './components/register/verify/verify/verify.module#VerifyModule'
  },

  {
    path: 'sign_in',
    loadChildren: './components/login/login.module#LoginModule'
  },

  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
