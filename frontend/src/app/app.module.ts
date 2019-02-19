import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HttpService} from './services/http.service';
import { AuthenticationService} from './services/auth.service';
import { LocalStorageService} from './services/localStorage.service';
import { JwtService} from './services/jwt.service';
import { UserService} from './services/user.service';
import {HeaderComponent} from './components/header/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule
  ],
  providers: [HttpService, AuthenticationService, LocalStorageService, JwtService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
