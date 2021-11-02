import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  sendMail(mail: any): Observable<any>{
      return this.http.post<any>(this.apiUrl + "mail",mail);
  }
}
