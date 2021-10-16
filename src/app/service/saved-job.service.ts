import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from 'src/app/model/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavedJobService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  public loginResponse$ = new BehaviorSubject<LoginResponse>(new LoginResponse);

  savedJob(data: any):Observable<any>{
    return this.http.post<any>(this.apiUrl + "saved-jobs", data)
    .pipe(catchError(this.handleError))
  }

  findSavedJobByAcc(accId: any): Observable<any>{
      return this.http.get<any>(this.apiUrl+"saved-jobs?accId="+accId)
  }

  deleteSavedJob(id: any):Observable<any>{
      return this.http.delete<any>(this.apiUrl+ "saved-jobs?id="+id);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
