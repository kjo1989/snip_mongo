import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService,
        // private utilsService: UtilsService
    ) {
    }
    private formatErrors(error: any) {
        return throwError(error.error);
    }
    get(path: string, headers?): Observable<any> {
        return this.http
            .get(`${environment.apiUrl}${path}`, {headers})
            .pipe(catchError(this.formatErrors));
    }
    /*put(path: string, body: Object = {}, headers?): Observable<any> {
        const transformedBody = this.utilsService.transformToSnakeCase(body);
        return this.http
            .put(
                `${environment.apiUrl}${path}`,
                JSON.stringify(transformedBody),
                {
                    headers
                }
            )
            .pipe(catchError(this.formatErrors));
    }*/
    patch(path: string, body: Object = {}, headers?): Observable<any> {
        return this.http
            .patch(
                `${environment.apiUrl}${path}`,
                JSON.stringify(body),
                {
                    headers
                }
            )
            .pipe(catchError(this.formatErrors));
    }
    post(path: string, body: Object = {}, headers?): Observable<any> {
        return this.http
            .post(
                path,
                body,
                {
                    headers
                }
            )
            .pipe(catchError(this.formatErrors));
    }
    /*delete(path): Observable<any> {
        return this.http
            .delete(`${environment.apiUrl}${path}`)
            .pipe(catchError(this.formatErrors));
    }*/
    setHeaders(isContentJson, isBearerNeeded) {
        const headerObj = {};
        if (isContentJson) {
            headerObj['Content-Type'] = 'application/json';
        }
        if (isBearerNeeded) {
            headerObj['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
        }
        return headerObj;
    }
    setMultipartHeaders(isContentJson, isBearerNeeded) {
        const headerObj = {};
        if (isContentJson) {
            headerObj['Content-Type'] = 'application/json';
        }
        if (isBearerNeeded) {
            headerObj['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
        }
        return headerObj;
    }
    getHeaders(isContentJson = false, isBearerNeeded = false) {
        const headerObj = this.setHeaders(isContentJson, isBearerNeeded);
        const headers = new HttpHeaders(headerObj);
        return headers;
    }
    getMultipartHeaders(isContentJson = false, isBearerNeeded = false) {
        const headerObj = this.setMultipartHeaders(isContentJson, isBearerNeeded);
        const headers = new HttpHeaders(headerObj);
        return headers;
    }
}
