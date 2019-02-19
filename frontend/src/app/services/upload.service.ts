import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public uploadedFile_Api = `${environment.apiUrl}/icons`;

  constructor(private httpService: HttpService) { }

  sendUploadedFIle(uploadedFile): Observable<any> {
    return this.httpService.post(this.uploadedFile_Api, uploadedFile);
  }
}
