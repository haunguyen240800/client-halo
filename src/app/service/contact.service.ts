import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from 'src/app/model/company';
import { LoginResponse } from 'src/app/model/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  findAll():Observable<any>{
    return this.http.get<any>(this.apiUrl+"companies")
  }

  save(request: any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"contacts",request);
  }

  delete():Observable<any>{
    return this.http.get<any>(this.apiUrl+"companies")
  }

}
