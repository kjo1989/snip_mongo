import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

  constructor(private jwtService: JwtService) {}

  isUserLoggedIn(): boolean {
    return !!this.jwtService.getToken();
  }

  getUserInfo(): {} | string {
    const jwt_decoder = require('jwt-decode'),

      token = this.jwtService.getToken();

    let jwt_decoded = token && jwt_decoder(token);

     const userInfo = jwt_decoded ? {
      id: jwt_decoded.id,
      name: jwt_decoded.name,
      email: jwt_decoded.email
    } : false;

    jwt_decoded = {};

    return userInfo;
  }
}

