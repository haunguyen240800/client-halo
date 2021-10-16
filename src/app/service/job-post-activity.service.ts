import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobPostActivityService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  findByAccId(accId: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"job-post-apply/accId?accId="+accId);
  }

  createJobApply(data: any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"job-post-apply",data).pipe(catchError(this.handleError));
  }

  delete(accId: number, jobPostId: number):Observable<any>{
    let params = new HttpParams();
    params.set('accId',accId).set('jobPostId',jobPostId);
    return this.http.delete<any>(this.apiUrl+"job-post-apply?accId="+accId+"&&jobPostId="+jobPostId);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
