import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify/verify.component';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class VerifyModule { }
