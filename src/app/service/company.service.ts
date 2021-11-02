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
export class CompanyService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  findAll():Observable<any>{
      return this.http.get<any>(this.apiUrl+"companies")
  }

  update(com : any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"companies",com);
}

  findById(companyId: any):Observable<any>{
      return this.http.get<any>(this.apiUrl+"companies/id?companyId="+companyId);
  }

  getCompanyByAccount(accId: any):Observable<Company>{
    return this.http.get<Company>(this.apiUrl+"companies/account?accId="+accId);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
