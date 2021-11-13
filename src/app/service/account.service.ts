import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from 'src/app/model/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  public loginResponse$ = new BehaviorSubject<LoginResponse>(new LoginResponse);

  findByUsername(username: any):Observable<LoginResponse>{
    return this.http.get<any>(this.apiUrl+"users/find-by-username?username="+username);
  }

  getAccount(accId: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"users/findByAccId?accId="+accId);
  }

  findRoleByUsername(username: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"roles/acc?username="+username);
  }

  updateAccount(acc: any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"users",acc);
  }

  createAcc(acc: any): Observable<any>{
    return this.http.post<any>(this.apiUrl+"users",acc).pipe(catchError(this.handleError));
  }

  changePassword(password: any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"users/change-password",password);
  }

  getAll(): Observable<any>{
    return this.http.get<any>(this.apiUrl+"users");
  }

  search(request: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"users/search?role="+request.role+"&username="+request.name);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
