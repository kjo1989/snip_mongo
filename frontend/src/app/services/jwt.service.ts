import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
    tokenKeyName = 'jwtToken';

    constructor(private _localStorageService: LocalStorageService) {}

    getToken(): string {
        return this._localStorageService.getItem(this.tokenKeyName);
    }

    saveToken(token: String) {
        this._localStorageService.setItem(this.tokenKeyName, token);
        return this.getToken();
    }

    destroyToken() {
        this._localStorageService.removeItem(this.tokenKeyName);
    }

    isTokenExpired(token?: string): boolean {
        if(!token) token = this.getToken();
        if(!token) return true;

        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
}
