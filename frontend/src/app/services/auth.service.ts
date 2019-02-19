import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {User} from  '../../../../src/models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public usersApi_Url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private httpService: HttpService) { }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`/users/authenticate`, { username, password })
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //
  //       return user;
  //     }));
  // }

  login(loginFormData): Observable<any> {
    const headers = this.httpService.getHeaders(true, false);
    return this.httpService.post(`${this.usersApi_Url}/sign_in`, loginFormData, headers).pipe(
      map(data => {
        return data;
      }));
  }

  register(registrFormData): Observable<any> {
    const headers = this.httpService.getHeaders(true, false);
    return this.httpService.post(`${this.usersApi_Url}`, registrFormData, headers).pipe(
      map(data => {
        return data;
      })
    );
  }

  verify(queryParams): Observable<any> {
    const headers = this.httpService.getHeaders(true, false);
    return this.httpService.post(`${this.usersApi_Url}/verify`, queryParams, headers);
  }

  updateStatus(id, updateParams): Observable<any> {
    const headers = this.httpService.getHeaders(true, false);
    return this.httpService.patch(`${this.usersApi_Url}/${id}`, updateParams, headers);
  }

  patchIsActivated(patchedData): Observable<any> {
    const headers = this.httpService.getHeaders(true, false);
    return this.httpService.patch(`${this.usersApi_Url}/user/confirm_registration`, patchedData, headers).pipe(
      map(data => {
        return data;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
