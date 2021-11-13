import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  apiUrl= environment.apiUrl;

  public alertResponse$ = new BehaviorSubject<any>("");
  alerts: any[] = [];
  constructor(private http: HttpClient) { }

  getAlert(accId: any,status?: any):Observable<any>{
    let url = "alert/getByAccId?accId="+accId;
    if (status){
      url = url + "&status="+status;
    }
    return this.http.get<any>(this.apiUrl+url);
  }

  create(alert: any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"alert",alert);
  }

  update(data: any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"alert",data);
  }

  getById(alertId: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"alert/findById?alertId="+alertId);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
