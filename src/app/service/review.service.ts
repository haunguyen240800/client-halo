import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from 'src/app/model/login-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  createReview(data: any):Observable<any>{
    return this.http.post<any>(this.apiUrl + "reviews", data)
    .pipe(catchError(this.handleError))
  }

  findReviewByCom(companyId: any): Observable<any>{
      return this.http.get<any>(this.apiUrl+"reviews?companyId="+companyId);
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
