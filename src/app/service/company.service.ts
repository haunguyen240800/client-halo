import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
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

  getComUUD3(request: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"companies/getComUUD3?packageCode="+request);
  }

  search(request: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"companies/search?cityName="+request.cityName+"&name="+request.name);
  }

  uploadLogo(file: any):Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.apiUrl+"companies/logo", formData,{
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
    // return this.http.post<any>(this.apiUrl + "companies/logo", file);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
